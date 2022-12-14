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
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value += action.payload;
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const incrementAsync = createAsyncThunk(
  //name
  "counter/fetchCount",
  // async thunk function
  async (amount) => {
    const res = await fetchCount(amount);
    return res.data;
  }
);

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
