import { getProfileIsLoading } from './getProfileIsLoading';
import { type StateSchema } from 'app/providers/StoreProvider';

describe('getProfileIsLoading', () => {
  test('should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getProfileIsLoading(mockedState as StateSchema)).toEqual(false);
  });

  test('should return profile isLoading state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true,
      },
    };

    expect(getProfileIsLoading(mockedState as StateSchema)).toEqual(true);
  });
});
