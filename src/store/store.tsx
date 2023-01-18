import {configureStore} from '@reduxjs/toolkit';
import {likeCounterSlice} from './likeCounterSlice';
import likeCounterReducer from './likeCounterSlice';
import tokenReducer from './tokenSlice';

export const store = configureStore({
  reducer: {
    likeCounter: likeCounterReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
