import { loginByUsername } from './loginByUsername';
import { userActions } from '@/entities/User';
import { TestApiAsyncThunk, createTestServer } from '@/shared/config/tests';
import { http, HttpResponse } from 'msw';
import { mockedUser } from '@/shared/mocks';
import { authByUsernameApi } from '../../../api/authByUsernameApi/authByUsernameApi';
import { API_ROUTES } from '@/shared/api';

const server = createTestServer();

const dtoMock = { username: '123', password: '123', };
describe('loginByUsername async thunk', () => {
  test('success login', async () => {
    server.use(http.post(API_ROUTES.login(), () => HttpResponse.json(mockedUser)));
    const thunk = new TestApiAsyncThunk(loginByUsername, authByUsernameApi);
    const result = await thunk.callThunk(dtoMock);

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(mockedUser));
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockedUser);
    expect(thunk.api.defaults.headers.common.Authorization).toBe(JSON.stringify(mockedUser));
  });

  test('error login', async () => {
    server.use(http.post(API_ROUTES.login(), () => new HttpResponse(null, { status: 403, })));
    const thunk = new TestApiAsyncThunk(loginByUsername, authByUsernameApi);
    const result = await thunk.callThunk(dtoMock);

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
