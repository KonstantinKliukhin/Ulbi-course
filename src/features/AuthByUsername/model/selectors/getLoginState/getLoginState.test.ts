import { type DeepPartial } from '@reduxjs/toolkit';
import { type LoginSchema } from '../../types/loginSchema';
import { getLoginState } from './getLoginState';
import { initialState } from '../../slice/loginSlice';

describe('getLoginState', () => {
  test('should return login state', () => {
    const loginState: LoginSchema = {
      username: 'username',
      password: 'password',
      error: 'error',
      isLoading: false,
    };
    const state: DeepPartial<StateSchema> = {
      loginForm: loginState,
    };

    expect(getLoginState(state as StateSchema)).toEqual(loginState);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginState(state as StateSchema)).toEqual(initialState);
  });
});
