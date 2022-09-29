import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";

const initialState = {
  value: 0,
  status: "idle",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    incrementAsync: (state, action) => {},
    incrementIfOdd: (state, action) => {},
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
} = counterSlice.actions;

export const selectCount = () => {};

export default counterSlice.reducer;
