import { type PayloadAction } from '@reduxjs/toolkit';
import { type ProfilePageSchema } from '../types/profilePageSchema';
import { buildSlice } from '@/shared/lib';

const initialState: ProfilePageSchema = {
  readonly: true,
};

export const profilePageSlice = buildSlice({
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

export const {
  profilePageActions,
  profilePageReducer,
  useProfilePageActions,
} = profilePageSlice;
