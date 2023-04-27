import { Provider } from "react-redux";
import { store } from "./store";
import Counter from "./Counter";

export default function CounterApp() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
