import {
  createSlice,
  AnyAction,
  Dispatch,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { fetchCount } from "src/utils";

interface CounterState {
  count: number;
}

const initialState: CounterState = { count: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    reset(state) {
      state.count = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(incrementAsync.pending, (state) => {
        console.log("pending");
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.count += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        console.log("rejected");
      });
  },
});

// action creator
export const { increment, decrement, reset } = counterSlice.actions;

// thunk
// export const incrementAsync =
//   (amount: number) => async (dispatch: Dispatch<AnyAction>) => {
//     const response = await fetchCount(amount);
//     dispatch(incrementByAmount(response.data));
//   };

// or

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

// selector
export const selectCount = (state: RootState) => state.counter.count;
export default counterSlice.reducer;
