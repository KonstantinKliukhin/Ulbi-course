import { type PayloadAction } from '@reduxjs/toolkit';
import { type User, type UserSchema } from '../types/user';
import { buildSlice } from '@/shared/lib';

const initialState: UserSchema = {
  authData: null,
};

export const userSlice = buildSlice({
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

export const {
  userActions,
  userReducer,
  useUserActions,
} = userSlice;
