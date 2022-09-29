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
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export const selectCount = (state) => {
  return state.counter.value;
};

export default counterSlice.reducer;
