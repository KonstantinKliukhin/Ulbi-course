import { type DeepPartial } from '@reduxjs/toolkit';
import { type LoginSchema } from '../../types/loginSchema';
import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
  test('should return login error', () => {
    const state: { loginForm: DeepPartial<LoginSchema> } = {
      loginForm: {
        error: 'error',
      },
    };

    expect(getLoginError(state as StateSchema)).toEqual('error');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginError(state as StateSchema)).toEqual(null);
  });
});
