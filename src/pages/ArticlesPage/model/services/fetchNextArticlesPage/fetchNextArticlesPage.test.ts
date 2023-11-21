import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { mockedArticles } from 'shared/mocks';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

jest.mock('../fetchArticlesList/fetchArticlesList');
jest.mock('../../slices/articlesPageSlice');

describe('fetchArticlesList', () => {
  test('success fetch next articles list', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        ids: [],
        entities: {},
        limit: 9,
        page: 2,
        hasMore: true,
        isLoading: false,
      },
    });
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockedArticles, }));

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(articlesPageActions.setPage).toHaveBeenCalled();
    expect(articlesPageActions.setPage).toHaveBeenCalledWith(3);
    expect(fetchArticlesList).toHaveBeenCalled();
    expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3, });
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('must not fetch articles if no more', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        limit: 9,
        hasMore: false,
        isLoading: false,
        page: 2,
      },
    });

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(articlesPageActions.setPage).not.toHaveBeenCalled();
    expect(fetchArticlesList).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('must not fetch articles if already loading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        limit: 9,
        hasMore: true,
        isLoading: true,
        page: 2,
      },
    });

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });
});
