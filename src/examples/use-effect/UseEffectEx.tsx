import { useEffect, useState } from "react";
import Header from "../../components/Header";

type ResourceTypeType = string | null;

export default function UseEffectEx() {
  const [resourceType, setResourceType] = useState<ResourceTypeType>(null);
  const [response, setResponse] = useState([]);

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
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then((response) => response.json())
        .then(setResponse);
    }
  }, [resourceType]);

  return (
    <section>
      <Header title="useState Example" />

      <button onClick={() => setResourceType("posts")}>Posts</button>
      <button onClick={() => setResourceType("comments")}>Comments</button>
      <button onClick={() => setResourceType("albums")}>Albums</button>
      <button onClick={() => setResourceType("photos")}>Photos</button>
      <button onClick={() => setResourceType("todos")}>Todos</button>
      <button onClick={() => setResourceType("users")}>Users</button>

      <div>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </section>
  );
}
