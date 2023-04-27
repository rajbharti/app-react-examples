import { useAppDispatch, useAppSelector } from "./hooks";
import {
  increment,
  incrementAsync,
  decrement,
  reset,
  selectCount,
} from "./reducer";
import Header from "src/components/Header";

export default function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <section>
      <Header title="Counter" />
      Count {count} <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementAsync(2))}>
        Async increment by 2
      </button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </section>
  );
}
