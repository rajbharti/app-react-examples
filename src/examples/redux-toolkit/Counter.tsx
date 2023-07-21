import {
  increment,
  incrementAsync,
  decrement,
  reset,
  selectCount,
} from "./reducer";
import Example from "src/components/Example";
import { useAppDispatch, useAppSelector } from "./hooks";

export default function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <Example hideParentTitle title="Counter">
      Count {count} <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementAsync(2))}>
        Async increment by 2
      </button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </Example>
  );
}
