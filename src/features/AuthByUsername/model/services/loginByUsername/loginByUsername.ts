import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { type User, userActions } from 'entities/User';
import { LoginError } from 'features/AuthByUsername/model/types/loginError';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants';

interface LoginByUsernameProps {
  username: string
  password: string
}

interface LoginByUsernameExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const loginByUsername =
    createAsyncThunk<User | undefined, LoginByUsernameProps, LoginByUsernameExtra>(
      'login/loginByUsername',
      async (authData, thunkAPI) => {
        try {
          const response = await thunkAPI.extra.api.post<User>('/login', authData);

          if (!response.data) {
            throw new Error(LoginError.NO_DATA_PROVIDED_FROM_SERVER);
          }

          saveUserToStorage(response.data);
          thunkAPI.dispatch(userActions.setAuthData(response.data));
          return response.data;
        } catch (e) {
          console.error(e);

          if (e instanceof AxiosError) {
            switch (e.response?.status) {
              case 403:
                return thunkAPI.rejectWithValue(LoginError.INVALID_CREDENTIALS);
              default:
                return thunkAPI.rejectWithValue(LoginError.UKNWON_ERROR);
            }
          } else if (e instanceof Error && e.message === LoginError.NO_DATA_PROVIDED_FROM_SERVER) {
            return thunkAPI.rejectWithValue(LoginError.NO_DATA_PROVIDED_FROM_SERVER);
          } else {
            return thunkAPI.rejectWithValue(LoginError.UKNWON_ERROR);
          }
        }
      }
    );

function saveUserToStorage (user: User) {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
}
