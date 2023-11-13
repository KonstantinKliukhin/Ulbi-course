import { getProfileReadonly } from './getProfileReadonly';
import { type StateSchema } from 'app/providers/StoreProvider';

describe('getProfileReadonly', () => {
  test('should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getProfileReadonly(mockedState as StateSchema)).toEqual(true);
  });

  test('should return profile readonly state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      profile: {
        readonly: false,
      },
    };

    expect(getProfileReadonly(mockedState as StateSchema)).toEqual(false);
  });
});
