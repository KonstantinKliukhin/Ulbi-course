import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type LoginSchema } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: LoginSchema = {
  isLoading: false,
  username: '',
  password: '',
  error: null,
};

export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: builder =>
    builder.addCase(loginByUsername.pending, (state) => {
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
