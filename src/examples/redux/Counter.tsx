import { legacy_createStore as createStore } from "redux";
import type { TagsInterface } from "../../types";
import Header from "../../components/Header";

interface ActionInterface {
  type: "increment" | "decrement" | "reset";
}

const initialState = { count: 0 };

function counterReducer(state = initialState, action: ActionInterface) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      state;
  }
}

const store = createStore(counterReducer);
store.subscribe(() => console.log(store.getState()));

export default function Counter({ tags }: TagsInterface) {
  return (
    <section>
      <Header title="Counter" tags={tags} />
      {/* Count {count} */}
      <button onClick={() => store.dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => store.dispatch({ type: "increment" })}>+</button>
      <button onClick={() => store.dispatch({ type: "reset" })}>Reset</button>
    </section>
  );
}
