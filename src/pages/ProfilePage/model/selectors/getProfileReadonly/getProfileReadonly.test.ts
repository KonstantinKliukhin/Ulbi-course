import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly', () => {
  test('should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getProfileReadonly(mockedState as StateSchema)).toEqual(true);
  });

  test('should return profile readonly state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      profilePage: {
        readonly: false,
      },
    };

    expect(getProfileReadonly(mockedState as StateSchema)).toEqual(false);
  });
});
