import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User, type UserSchema } from '../types/user';

const initialState: UserSchema = {
  authData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    removeAuthData: (state) => {
      state.authData = null;
    },
  },
});

export const { actions: userActions, } = userSlice;
export const userReducer = userSlice.reducer;
