import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { mockedArticles } from 'shared/mocks';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { initArticlesPage } from './initArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');
jest.mock('../../slices/articlesPageSlice');

describe('initArticlesPage', () => {
  test('success initialized articles page state', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        ids: [],
        entities: {},
        limit: 9,
        page: 1,
        hasMore: true,
        isLoading: false,
        _inited: false,
      },
    });
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockedArticles, }));

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(articlesPageActions.initState).toHaveBeenCalledTimes(1);
    expect(fetchArticlesList).toHaveBeenCalled();
    expect(fetchArticlesList).toHaveBeenCalledWith({ page: 1, });
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('must not initialize article state if already initialized', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        ids: [],
        entities: {},
        limit: 9,
        page: 1,
        hasMore: true,
        isLoading: false,
        _inited: true,
      },
    });

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(articlesPageActions.initState).not.toHaveBeenCalled();
    expect(fetchArticlesList).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });
});
