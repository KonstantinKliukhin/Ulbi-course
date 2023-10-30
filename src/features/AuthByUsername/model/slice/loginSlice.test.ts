import { type DeepPartial } from '@reduxjs/toolkit';
import { loginReducer, type LoginSchema } from 'features/AuthByUsername';
import { loginActions } from './loginSlice';

describe('loginSlice', () => {
  test('set username', () => {
    const state: DeepPartial<LoginSchema> = { username: '123', };

    expect(loginReducer(state as LoginSchema, loginActions.setUsername('username')))
      .toEqual({ username: 'username', });
  });

  test('set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123', };

    expect(loginReducer(state as LoginSchema, loginActions.setPassword('password')))
      .toEqual({ password: 'password', });
  });
});
