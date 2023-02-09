import {configureStore} from '@reduxjs/toolkit';
import likeCounterReducer from './likeCounterSlice';
import tokenReducer from './tokenSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    likeCounter: likeCounterReducer,
    token: tokenReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
