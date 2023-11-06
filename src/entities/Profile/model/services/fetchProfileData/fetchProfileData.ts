import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Profile } from '../../types/profile';

interface fetchProfileDataExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const fetchProfileData =
    createAsyncThunk<Profile, undefined, fetchProfileDataExtra>(
      'profile/fetchProfileData',
      async (_, thunkAPI) => {
        try {
          const response = await thunkAPI.extra.api.get<Profile>('/profile');

          return response.data;
        } catch (e) {
          console.error(e);
          return thunkAPI.rejectWithValue('error');
        }
      }
    );

// function saveUserToStorage (user: Profile) {
//   localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
// }
