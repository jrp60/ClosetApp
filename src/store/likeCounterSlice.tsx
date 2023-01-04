import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface LikeCounterState {
  value: number;
}

const initialState: LikeCounterState = {
  value: 1,
};

export const likeCounterSlice = createSlice({
  name: 'likeCounter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    reset: state => {
      state.value = 0;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement, reset, incrementByAmount} =
  likeCounterSlice.actions;

export default likeCounterSlice.reducer;
