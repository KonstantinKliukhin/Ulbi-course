import { type UserSchema } from '../types/user';
import { userActions, userReducer } from './userSlice';
import { mockedUser } from '@/shared/mocks';

describe('userSlice', () => {
  test('setAuthData', () => {
    const state: DeepPartial<UserSchema> = { authData: null, };

    expect(userReducer(state as UserSchema, userActions.setAuthData(mockedUser)))
      .toEqual({ authData: mockedUser, });
  });

  test('removeAuthData', () => {
    const state: DeepPartial<UserSchema> = { authData: mockedUser, };

    expect(userReducer(state as UserSchema, userActions.removeAuthData()))
      .toEqual({ authData: null, });
  });
});
