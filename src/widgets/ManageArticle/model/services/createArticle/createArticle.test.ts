import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { mockedArticle, mockedArticleForm, mockedUser } from 'shared/mocks';
import { createArticle } from './createArticle';

describe('createArticle', () => {
  const validState: DeepPartial<StateSchema> = {
    user: { authData: mockedUser, },
  };
  test('success create article', async () => {
    const thunk = new TestAsyncThunk(createArticle, validState);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: mockedArticle, }));

    const result = await thunk.callThunk(mockedArticleForm);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalledTimes(1);
    expect(thunk.navigate).toHaveBeenCalledTimes(1);
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockedArticle);
  });

  test('error create article', async () => {
    const thunk = new TestAsyncThunk(createArticle, validState);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403, }));

    const result = await thunk.callThunk(mockedArticleForm);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.navigate).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
