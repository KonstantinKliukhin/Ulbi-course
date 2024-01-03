import { profilePageActions, profilePageReducer } from './profilePageSlice';
import { type ProfilePageSchema } from '../types/profilePageSchema';

describe('profileSlice', () => {
  test('setReadonly', () => {
    const state: DeepPartial<ProfilePageSchema> = {
      readonly: true,
    };

    expect(profilePageReducer(state as ProfilePageSchema, profilePageActions.setReadonly(false)))
      .toEqual({ readonly: false, });
  });

  test('removeAuthData', () => {
    const state: DeepPartial<ProfilePageSchema> = { readonly: false, };

    expect(profilePageReducer(state as ProfilePageSchema, profilePageActions.cancelEdit()))
      .toEqual({ readonly: true, });
  });
});
