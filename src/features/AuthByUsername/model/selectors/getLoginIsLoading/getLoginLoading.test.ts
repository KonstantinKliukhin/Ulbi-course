import { type LoginSchema } from '../../types/loginSchema';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginLoading', () => {
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
});
