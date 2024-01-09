import { createAsyncThunk } from '@reduxjs/toolkit';
import { type User, userActions } from '@/entities/User';
import { LOGIN_ERRORS } from '../../errors/loginErrors';
import { COMMON_API_ERRORS, LOCAL_STORAGE_USER_KEY } from '@/shared/constants';
import { type LoginDto } from '../../types/login.dto';
import { authByUsernameApi } from '../../../api/authByUsernameApi/authByUsernameApi';
import { normalizeRtkError, ApiError } from '@/shared/lib';

interface LoginByUsernameExtra extends ThunkDefaultArg {
  rejectValue: string;
}

export const loginByUsername =
    createAsyncThunk<User | undefined, LoginDto, LoginByUsernameExtra>(
      'login/loginByUsername',
      async (authData, thunkAPI) => {
        try {
          const response = await thunkAPI.dispatch(authByUsernameApi.endpoints.login.initiate(authData));

          if (!('data' in response)) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw normalizeRtkError(response.error);
          }

          saveUserToStorage(response.data);
          thunkAPI.dispatch(userActions.setAuthData(response.data));
          thunkAPI.extra.api.defaults.headers.common.Authorization = JSON.stringify(response.data);

          return response.data;
        } catch (e) {
          console.error(e);

          if (e instanceof ApiError) {
            switch (e.status) {
              case 403:
                return thunkAPI.rejectWithValue(LOGIN_ERRORS.INVALID_CREDENTIALS);
              default:
                return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
            }
          } else {
            return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
          }
        }
      }
    );

function saveUserToStorage (user: User) {
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
}
