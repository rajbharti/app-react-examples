import { createSlice, configureStore } from "@reduxjs/toolkit";
import type { TagsInterface } from "../../types";
import Header from "../../components/Header";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment(state) {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    reset(state) {
      state.count = 0;
    },
  },
});

const { increment, decrement, reset } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
});

store.subscribe(() => console.log(store.getState()));

export default function Counter({ tags }: TagsInterface) {
  return (
    <section>
      <Header title="Counter" tags={tags} />
      {/* Count {count} */}
      <button onClick={() => store.dispatch(decrement())}>-</button>
      <button onClick={() => store.dispatch(increment())}>+</button>
      <button onClick={() => store.dispatch(reset())}>Reset</button>
    </section>
  );
}
