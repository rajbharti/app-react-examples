import { useReducer } from "react";

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

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h3>
        Counter{" "}
        <span className="inline-tags">
          <span>#useReducer</span>
        </span>
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
