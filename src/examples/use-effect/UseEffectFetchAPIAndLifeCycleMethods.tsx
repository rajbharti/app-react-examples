import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Example from "src/components/Example";
import ButtonToggle from "src/components/ButtonToggle";
import { getTitleCase } from "src/utils";

interface State {
  isLoading?: boolean;
  hasError?: boolean;
  data?: Response | null;
}

interface Action {
  type: "API_START" | "API_END" | "API_ERROR" | "API_ABORT" | "API_RESET";
  payload?: Response | null;
}

const initialState = {
  isLoading: false,
  hasError: false,
  data: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "API_START":
      return { ...state, isLoading: true, hasError: false };
    case "API_END":
      return { ...state, isLoading: false, data: action.payload };
    case "API_ERROR":
      return { ...state, isLoading: false, hasError: true, data: null };
    case "API_ABORT":
      return { ...state, data: null };
    case "API_RESET":
      return initialState;
    default:
      return state;
  }
}

const labels: readonly string[] = [
  "Posts",
  "Comments",
  "Albums",
  "Photos",
  "Todos",
  "Users",
];

export default function UseEffectFetchAPIAndLifeCycleMethods() {
  const [resourceType, setResourceType] = useState<string | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const dataElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("onRender");
  });

  useEffect(() => {
    console.log("onMount"); // componentDidMount
    document.title = "useEffect Example";

    return () => {
      console.log("onUnmount"); // componentWillUnmount
      document.title = "React Examples";
    };
  }, []);

  useEffect(() => {
    console.log("onMount and onUpdate"); // componentDidMount and componentDidUpdate

    const abortControllerRef = new AbortController();
    const signal = abortControllerRef.signal;

    if (resourceType !== null) {
      (async () => {
        try {
          dispatch({ type: "API_START" });
          let response = await fetch(
            `https://jsonplaceholder.typicode.com/${resourceType}`,
            {
              signal,
            }
          );
          response = await response.json();
          dispatch({ type: "API_END", payload: response });

          const el = dataElRef.current as HTMLDivElement;
          if (el?.scrollHeight > el?.clientHeight) {
            el?.scrollTo(0, 0);
          }
        } catch (e: any) {
          if (e.name === "AbortError") {
            console.error(`request aborted for "${resourceType}"`);
            dispatch({ type: "API_ABORT" });
          } else {
            dispatch({ type: "API_ERROR" });
          }
        }
      })();
    } else {
      dispatch({ type: "API_RESET" });
    }

    return () => {
      abortControllerRef.abort();
    };
  }, [resourceType]);

  const handleClick = useCallback(function (label: string | null) {
    setResourceType(label === null ? null : label.toLocaleLowerCase());
  }, []);

  return (
    <Example
      hideParentCompLabel
      title="Fetching APIs and Life Cycle Methods"
      comments="check console and network tab"
    >
      <ButtonToggle labels={labels} onClick={handleClick} />

      {state.isLoading && resourceType && (
        <span className="mx-1 font-bold">
          Loading {getTitleCase(resourceType as string)}
          ...
        </span>
      )}

      {state.hasError && (
        <div className="mt-2 text-red-500">
          Something went wrong. Try again!
        </div>
      )}

      {state.data && resourceType && (
        <div className="mt-2 max-h-500px overflow-auto" ref={dataElRef}>
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}
    </Example>
  );
}
