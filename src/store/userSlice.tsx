import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

//TODO - Maybe unify token inside UserData
interface UserState {
  user: User;
}

export interface User {
  token: string;
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  remember_session: boolean;
}

const initialState: UserState = {
  user: {
    token: '',
    id: '',
    email: '',
    name: '',
    created_at: '',
    updated_at: '',
    remember_session: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = initialState.user;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
