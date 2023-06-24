import { useCallback, useEffect, useRef, useState } from "react";
import Example from "src/components/Example";
import ButtonToggle from "src/components/ButtonToggle";
import { getTitleCase } from "src/utils";

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
  const [resourceType, setResourceType] = useState<string | null>(null);
  const [query, setQuery] = useState<APIQuery>({
    isLoading: false,
    hasError: false,
    data: null,
  });

  const dataElRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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

    const el = dataElRef.current as HTMLDivElement;
    if (el?.scrollHeight > el?.clientHeight) {
      el?.scrollTo(0, 0);
    }

    if (resourceType !== null) {
      (async () => {
        setQuery((prevState) => ({
          ...prevState,
          isLoading: true,
          hasError: false,
        }));

        try {
          abortControllerRef.current = new AbortController();
          const signal = abortControllerRef.current?.signal;

          let response = await fetch(
            `https://jsonplaceholder.typicode.com/${resourceType}`,
            {
              signal,
            }
          );
          response = await response.json();
          setQuery((prevState) => ({
            ...prevState,
            data: response,
          }));
        } catch (e: any) {
          if (e.name === "AbortError") {
            console.error(`request aborted for "${resourceType}"`);
          }

          setQuery((prevState) => ({
            ...prevState,
            ...(e.name === "AbortError"
              ? { data: null }
              : { hasError: true, data: null }),
          }));
        }

        setQuery((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      })();
    } else if (query.hasError) {
      setQuery((prevState) => ({
        ...prevState,
        hasError: false,
      }));
    }
  }, [resourceType]);

  const handleClick = useCallback(function (label: string | null) {
    abortControllerRef.current?.abort();
    setResourceType(label === null ? null : label.toLocaleLowerCase());
  }, []);

  return (
    <Example
      hasNestedComp={false}
      title="Fetching APIs and Life Cycle Methods"
      comments="check console and network tab"
    >
      <ButtonToggle labels={labels} onClick={handleClick} />

      {query.isLoading && (
        <span className="mx-1 font-bold">
          Loading {getTitleCase(resourceType as string)}
          ...
        </span>
      )}

      {query.hasError && (
        <div className="mt-2 text-red-500">
          Something went wrong. Try again!
        </div>
      )}

      {query.data && resourceType && (
        <div className="mt-2 max-h-500px overflow-auto" ref={dataElRef}>
          <pre>{JSON.stringify(query.data, null, 2)}</pre>
        </div>
      )}
    </Example>
  );
}
