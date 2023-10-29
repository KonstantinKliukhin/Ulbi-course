import { type DeepPartial } from '@reduxjs/toolkit';
import { type User, type UserSchema } from '../types/user';
import { userActions, userReducer } from './userSlice';

describe('userSlice', () => {
  const user: User = {
    username: 'user_name',
    id: '1',
  };

  test('setAuthData', () => {
    const state: DeepPartial<UserSchema> = { authData: null, };

    expect(userReducer(state as UserSchema, userActions.setAuthData(user)))
      .toEqual({ authData: user, });
  });

  test('removeAuthData', () => {
    const state: DeepPartial<UserSchema> = { authData: user, };

    expect(userReducer(state as UserSchema, userActions.removeAuthData()))
      .toEqual({ authData: null, });
  });
});
