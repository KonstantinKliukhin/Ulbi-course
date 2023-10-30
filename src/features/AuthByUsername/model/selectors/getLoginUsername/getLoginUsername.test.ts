import { type DeepPartial } from '@reduxjs/toolkit';
import { type LoginSchema } from '../../types/loginSchema';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername', () => {
  test('should return login username', () => {
    const state: { loginForm: DeepPartial<LoginSchema> } = {
      loginForm: {
        username: 'username',
      },
    };

    expect(getLoginUsername(state as StateSchema)).toEqual('username');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
});
