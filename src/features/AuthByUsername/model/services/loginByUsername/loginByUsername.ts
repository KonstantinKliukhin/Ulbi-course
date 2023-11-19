import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { type User, userActions } from 'entities/User';
import { LOGIN_ERRORS } from '../../errors/loginErrors';
import { COMMON_API_ERRORS, LOCAL_STORAGE_USER_KEY } from 'shared/constants';

interface LoginByUsernameArgs {
  username: string
  password: string
}

interface LoginByUsernameExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const loginByUsername =
    createAsyncThunk<User | undefined, LoginByUsernameArgs, LoginByUsernameExtra>(
      'login/loginByUsername',
      async (authData, thunkAPI) => {
        try {
          const response = await thunkAPI.extra.api.post<User>('/login', authData);

          if (!response.data) {
            throw new Error(COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
          }

          saveUserToStorage(response.data);
          thunkAPI.dispatch(userActions.setAuthData(response.data));
          return response.data;
        } catch (e) {
          console.error(e);

          if (e instanceof AxiosError) {
            switch (e.response?.status) {
              case 403:
                return thunkAPI.rejectWithValue(LOGIN_ERRORS.INVALID_CREDENTIALS);
              default:
                return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
            }
          } else if (e instanceof Error && e.message === COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER) {
            return thunkAPI.rejectWithValue(COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
          } else {
            return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
          }
        }
      }
    );

function saveUserToStorage (user: User) {
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
}
