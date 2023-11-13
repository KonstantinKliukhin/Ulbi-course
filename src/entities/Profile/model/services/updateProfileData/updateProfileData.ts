import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Profile } from '../../types/profile';
import { COMMON_API_ERRORS } from 'shared/constants';

interface fetchProfileDataExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const updateProfileData =
    createAsyncThunk<Profile, Profile, fetchProfileDataExtra>(
      'profile/updateProfileData',
      async (profileForm, thunkAPI) => {
        try {
          const response = await thunkAPI.extra.api.put<Profile>('/profile', profileForm);

          if (!response.data) {
            throw new Error(COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
          }

          return response.data;
        } catch (e) {
          console.error(e);

          if (e instanceof Error && e.message === COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER) {
            return thunkAPI.rejectWithValue(COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
          } else {
            return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
          }
        }
      }
    );
