import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: ProfileSchema = {
  data: null,
  isLoading: false,
  error: null,
  readonly: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    cancelEdit: (state) => {
      state.readonly = true;
      state.error = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
        state.readonly = true;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      }),
});

export const { actions: profileActions, } = profileSlice;
export const profileReducer = profileSlice.reducer;
