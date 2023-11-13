import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';
import { mockedProfile } from 'shared/mocks';

describe('fetchProfileData', () => {
  test('success update profile', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockedProfile, }));

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockedProfile);
  });

  test('error update profile', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403, }));

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
