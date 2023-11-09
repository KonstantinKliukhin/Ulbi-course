import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Profile } from '../../types/profile';
import { COMMON_ERRORS } from 'shared/constants';

interface fetchProfileDataExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const fetchProfileData =
    createAsyncThunk<Profile, undefined, fetchProfileDataExtra>(
      'profile/fetchProfileData',
      async (_, thunkAPI) => {
        try {
          const response = await thunkAPI.extra.api.get<Profile>('/profile');

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

// function saveUserToStorage (user: Profile) {
//   localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
// }
