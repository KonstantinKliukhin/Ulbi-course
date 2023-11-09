import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Profile } from '../../types/profile';
import { COMMON_ERRORS } from 'shared/constants';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

interface fetchProfileDataExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const updateProfileData =
    createAsyncThunk<Profile, undefined, fetchProfileDataExtra>(
      'profile/updateProfileData',
      async (_, thunkAPI) => {
        try {
          const profile = getProfileForm(thunkAPI.getState());
          const response = await thunkAPI.extra.api.put<Profile>('/profile', profile);

          if (!response.data) {
            throw new Error(COMMON_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
          }

          return response.data;
        } catch (e) {
          console.error(e);

          if (e instanceof Error && e.message === COMMON_ERRORS.NO_DATA_PROVIDED_FROM_SERVER) {
            return thunkAPI.rejectWithValue(COMMON_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
          } else {
            return thunkAPI.rejectWithValue(COMMON_ERRORS.UNKNOWN_ERROR);
          }
        }
      }
    );
