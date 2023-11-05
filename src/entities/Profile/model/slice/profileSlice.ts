import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Profile, type ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
  profile: null,
  isLoading: false,
  error: null,
  readonly: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});

export const { actions: profileActions, } = profileSlice;
export const profileReducer = profileSlice.reducer;
