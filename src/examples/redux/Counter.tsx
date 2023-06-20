import { legacy_createStore as createStore } from "redux";
import Example from "src/components/Example";

interface State {
  count: number;
}

interface Action {
  type: "increment" | "decrement" | "reset";
}

const initialState: State = { count: 0 };

function counterReducer(state = initialState, action: Action): State {
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

const store = createStore(counterReducer);
store.subscribe(() => console.log(store.getState()));

export default function Counter() {
  return (
    <Example hasNestedComp={false} title="Counter" comments="check console">
      {/* Count {count} */}
      <button onClick={() => store.dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => store.dispatch({ type: "increment" })}>+</button>
      <button onClick={() => store.dispatch({ type: "reset" })}>Reset</button>
    </Example>
  );
}
