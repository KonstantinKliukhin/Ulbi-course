import { type DeepPartial } from '@reduxjs/toolkit';
import { type LoginSchema } from '../../types/loginSchema';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
  test('should return login password', () => {
    const state: { loginForm: DeepPartial<LoginSchema> } = {
      loginForm: {
        password: 'password',
      },
    };

    expect(getLoginPassword(state as StateSchema)).toEqual('password');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginPassword(state as StateSchema)).toEqual('');
  });
});
