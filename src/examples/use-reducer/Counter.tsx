import { useReducer } from "react";
import Example from "src/components/Example";

interface State {
  count: number;
}
interface Action {
  type: "increment" | "decrement" | "reset";
}

const initialState = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Example hasNestedComp={false} title="Counter">
      Count: {state.count}{" "}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </Example>
  );
}
