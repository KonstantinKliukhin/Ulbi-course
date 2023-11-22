import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { fetchArticlesList } from './fetchArticlesList';
import { mockedArticles } from 'shared/mocks';
import { ArticleSortField } from 'entities/Article';

describe('fetchArticlesList', () => {
  test('success fetch articles list', async () => {
    const thunk = new TestAsyncThunk(fetchArticlesList, {
      articlesPage: {
        limit: 9,
        page: 1,
        search: '',
        sort: ArticleSortField.CREATED,
        order: 'asc',
      },
    });
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockedArticles, }));

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockedArticles);
  });

  test('error fetch articles list', async () => {
    const thunk = new TestAsyncThunk(fetchArticlesList, {
      articlesPage: {
        limit: 9,
      },
    });

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403, }));

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
