import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { mockedArticle, mockedArticleForm, mockedUser } from 'shared/mocks';
import { updateArticle } from './updateArticle';
import { articleDetailsActions } from '../../../../../entities/Article/model/slices/articleDetailsSlice';

jest.mock('../../../../../entities/Article/model/slices/articleDetailsSlice');

describe('updateArticle', () => {
  const validState: DeepPartial<StateSchema> = {
    user: { authData: mockedUser, },
    articleDetails: {
      data: mockedArticle,
    },
  };

  test('success update article', async () => {
    const thunk = new TestAsyncThunk(updateArticle, validState);

    thunk.api.put.mockReturnValue(Promise.resolve({ data: mockedArticle, }));

    const result = await thunk.callThunk(mockedArticleForm);

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(thunk.api.put).toHaveBeenCalledTimes(1);
    expect(articleDetailsActions.setArticle).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockedArticle);
  });

  test('error update article', async () => {
    const thunk = new TestAsyncThunk(updateArticle, validState);
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403, }));

    const result = await thunk.callThunk(mockedArticleForm);

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(thunk.api.put).toHaveBeenCalledTimes(1);
    expect(articleDetailsActions.setArticle).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
