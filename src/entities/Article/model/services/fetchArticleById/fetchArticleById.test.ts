import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { mockedArticle } from 'shared/mocks';
import { fetcharticleById } from './fetchArticleById';

describe('fetchArticleById', () => {
  test('success fetch article', async () => {
    const thunk = new TestAsyncThunk(fetcharticleById);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockedArticle, }));

    const result = await thunk.callThunk('1');

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockedArticle);
  });

  test('error fetch article', async () => {
    const thunk = new TestAsyncThunk(fetcharticleById);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403, }));

    const result = await thunk.callThunk('error');

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
