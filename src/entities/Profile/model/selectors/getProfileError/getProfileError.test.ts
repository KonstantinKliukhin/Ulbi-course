import { getProfileError } from './getProfileError';
import { type StateSchema } from 'app/providers/StoreProvider';

describe('getProfileError', () => {
  test('should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getProfileError(mockedState as StateSchema)).toEqual(null);
  });

  test('should return profile error state', () => {
    const error = 'Some Api error';
    const mockedState: DeepPartial<StateSchema> = {
      profile: {
        error,
      },
    };

    expect(getProfileError(mockedState as StateSchema)).toEqual(error);
  });
});
