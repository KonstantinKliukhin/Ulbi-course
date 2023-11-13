import { createSlice } from '@reduxjs/toolkit';
import { type LoginSchema } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

export const initialState: LoginSchema = {
  isLoading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      }),
});

export const { actions: loginActions, } = loginSlice;
export const loginReducer = loginSlice.reducer;
