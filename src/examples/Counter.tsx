import { useReducer } from "react";
import type { TagsInterface } from "../types";
import Tags from "../components/Tags";

interface StateInterface {
  count: number;
}
interface ActionInterface {
  type: "increment" | "decrement" | "reset";
}

const initialState = { count: 0 };

function reducer(
  state: StateInterface,
  action: ActionInterface
): StateInterface {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function Counter({ tags }: TagsInterface) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h3>
        Counter <Tags tags={tags} />
      </h3>
      <div>
        Count: {state.count}{" "}
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </>
  );
}
