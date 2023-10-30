import { jest } from '@jest/globals';
import axios from 'axios';
import { loginByUsername } from './loginByUsername';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

describe('loginByUsername async thunk', () => {
  test('success login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    const userValue = { username: '123', id: '1', };
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue, }));

    const result = await thunk.callThunk({ username: '123', password: '123', });

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  test('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403, }));

    const result = await thunk.callThunk({ username: '123', password: '123', });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
