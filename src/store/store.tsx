import {configureStore} from '@reduxjs/toolkit';
import {likeCounterSlice} from './likeCounterSlice';
import likeCounterReducer from './likeCounterSlice';

export const store = configureStore({
  reducer: {
    likeCounter: likeCounterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
