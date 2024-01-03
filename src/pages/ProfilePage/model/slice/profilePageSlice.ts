import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ProfilePageSchema } from '../types/profilePageSchema';

const initialState: ProfilePageSchema = {
  readonly: true,
};

export const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    cancelEdit: (state) => {
      state.readonly = true;
    },
  },
});

export const { actions: profilePageActions, } = profilePageSlice;
export const profilePageReducer = profilePageSlice.reducer;
