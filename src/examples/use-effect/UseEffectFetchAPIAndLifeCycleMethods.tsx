import { useCallback, useEffect, useRef, useState } from "react";
import Example from "src/components/Example";
import ButtonToggle from "src/components/ButtonToggle";

type ResourceType = string | null;
type Response = Record<string, any>;
interface APIQuery {
  isLoading?: boolean;
  hasError?: boolean;
  data?: Response | null;
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
  const [resourceType, setResourceType] = useState<ResourceType>(null);
  const [apiQuery, setApiQuery] = useState<APIQuery>({
    isLoading: false,
    hasError: false,
    data: null,
  });

  const dataElRef = useRef<HTMLDivElement>(null);

  const controller = new AbortController();
  const { signal } = controller;

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

    dataElRef.current?.scrollTo(0, 0);

    if (resourceType !== null) {
      (async () => {
        setApiQuery((prevState) => ({
          ...prevState,
          isLoading: true,
          hasError: false,
        }));

        try {
          let response = await fetch(
            `https://jsonplaceholder.typicode.com/${resourceType}`,
            {
              signal,
            }
          );
          response = await response.json();
          setApiQuery((prevState) => ({
            ...prevState,
            data: response,
          }));
        } catch (e: any) {
          if (e.name === "AbortError") {
            console.error(`request aborted for "${resourceType}"`);
          }

          setApiQuery((prevState) => ({
            ...prevState,
            ...(e.name === "AbortError"
              ? { data: null }
              : { hasError: true, data: null }),
          }));
        }

        setApiQuery((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      })();
    } else if (apiQuery.hasError) {
      setApiQuery((prevState) => ({
        ...prevState,
        hasError: false,
      }));
    }
  }, [resourceType]);

  const handleClick = useCallback(function (label: string | null) {
    // TODO: abort not working
    console.log("---", label);
    controller.abort();
    setResourceType(label === null ? label : label!.toLocaleLowerCase());
  }, []);

  return (
    <Example
      hasNestedComp={false}
      title="Fetching APIs and Life Cycle Methods"
      comments="check console and network tab"
    >
      <ButtonToggle labels={labels} onClick={handleClick} />

      {apiQuery.isLoading && <div className="my-2 font-bold">Loading...</div>}

      {apiQuery.hasError && (
        <div className="mt-2 text-red-500">
          Something went wrong. Try again!
        </div>
      )}

      {apiQuery.data && resourceType && (
        <div className="mt-2 max-h-500px overflow-auto" ref={dataElRef}>
          <pre>{JSON.stringify(apiQuery.data, null, 2)}</pre>
        </div>
      )}
    </Example>
  );
}
