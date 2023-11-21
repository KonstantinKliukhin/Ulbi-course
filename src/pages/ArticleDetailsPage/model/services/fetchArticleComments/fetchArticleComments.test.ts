import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { fetchArticleComments } from './fetchArticleComments';
import { mockedArticle, mockedComments } from 'shared/mocks';

describe('fetchArticleComments', () => {
  test('success fetch article comments', async () => {
    const thunk = new TestAsyncThunk(fetchArticleComments);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockedComments, }));

    const result = await thunk.callThunk(mockedArticle.id);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockedComments);
  });

  test('error fetch article comments', async () => {
    const thunk = new TestAsyncThunk(fetchArticleComments);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403, }));

    const result = await thunk.callThunk('error');

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
