import { useEffect, useState } from "react";
import Example from "src/components/Example";

type ResourceType = string | null;
type Response = Record<string, any>;

export default function UseEffectFetchAPIAndLifeCycleMethods() {
  const [resourceType, setResourceType] = useState<ResourceType>(null);
  const [response, setResponse] = useState<Response>([]);
  const [error, setError] = useState(false);

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

    if (resourceType !== null) {
      (async () => {
        try {
          let response = await fetch(
            `https://jsonplaceholder.typicode.com/${resourceType}`
          );
          response = await response.json();
          setError(false);
          setResponse(response);
        } catch (e) {
          setError(true);
        }
      })();
    }
  }, [resourceType]);

  // TODO: create a component to render toggle button
  return (
    <Example hasNestedComp={false} title="Fetching APIs and Life Cycle Methods">
      <button onClick={() => setResourceType("posts")}>Posts</button>
      <button onClick={() => setResourceType("comments")}>Comments</button>
      <button onClick={() => setResourceType("albums")}>Albums</button>
      <button onClick={() => setResourceType("photos")}>Photos</button>
      <button onClick={() => setResourceType("todos")}>Todos</button>
      <button onClick={() => setResourceType("users")}>Users</button>

      <br />
      {error ? (
        <div className="mt-1 text-red-500">
          Something went wrong. Try again!
        </div>
      ) : (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </Example>
  );
}
