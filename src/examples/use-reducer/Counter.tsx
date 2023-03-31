import { useReducer } from "react";

interface StateInterface {
  count: number;
}
interface ActionType {
  type: "increment" | "decrement";
}

const initialState = { count: 0 };

function reducer(state: StateInterface, action: ActionType): StateInterface {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleIncrement = () => dispatch({ type: "increment" });
  const handleDecrement = () => dispatch({ type: "decrement" });

  return (
    <div className="grid">
      <button onClick={handleDecrement}>-</button>
      {state.count}
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}
