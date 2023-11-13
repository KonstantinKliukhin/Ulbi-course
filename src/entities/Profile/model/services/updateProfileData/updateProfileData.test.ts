import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { updateProfileData } from './updateProfileData';
import { type Profile } from '../../types/profile';
import { mockedProfile } from 'shared/mocks';

describe('updateProfileData', () => {
  test('success update profile', async () => {
    const thunk = new TestAsyncThunk(updateProfileData);
    const profileValue: Profile = { firstname: 'Kostya', };
    thunk.api.put.mockReturnValue(Promise.resolve({ data: mockedProfile, }));

    const result = await thunk.callThunk(profileValue);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockedProfile);
  });

  test('error update profile', async () => {
    const thunk = new TestAsyncThunk(updateProfileData);
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403, }));

    const result = await thunk.callThunk({ firstname: 'Kostya', });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
