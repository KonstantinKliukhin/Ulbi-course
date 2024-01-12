import { type LoginSchema } from '../../types/loginSchema';
import { getLoginIsLoading, getLoginError } from './getLoginState';

describe('getLoginState', () => {
  test('should return login loading state', () => {
    const state: { loginForm: DeepPartial<LoginSchema> } = {
      loginForm: {
        isLoading: true,
      },
    };

    expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
  });

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
