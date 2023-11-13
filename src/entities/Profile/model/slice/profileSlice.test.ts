import { profileActions, profileReducer } from './profileSlice';
import { type ProfileSchema } from '../types/profile';

describe('profileSlice', () => {
  test('setReadonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: true,
    };

    expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(false)))
      .toEqual({ readonly: false, });
  });

  test('removeAuthData', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false, error: 'some api error', };

    expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit()))
      .toEqual({ readonly: true, error: null, });
  });
});
