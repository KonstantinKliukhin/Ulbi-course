import { getProfile } from './getProfile';
import { type StateSchema } from 'app/providers/StoreProvider';
import { mockedProfile } from 'shared/mocks';

describe('getProfile', () => {
  test('should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getProfile(mockedState as StateSchema)).toEqual(null);
  });

  test('should return profile state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      profile: {
        data: mockedProfile,
      },
    };

    expect(getProfile(mockedState as StateSchema)).toEqual(mockedProfile);
  });
});
