import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData', () => {
  test('should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      user: {},
    };

    expect(getUserAuthData(mockedState as StateSchema)).toEqual(null);
  });

  test('should return user auth data state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      user: {
        authData: {
          username: 'Kostya',
          id: '123123',
        },
      },
    };

    expect(getUserAuthData(mockedState as StateSchema)).toEqual(mockedState.user!.authData);
  });
});
