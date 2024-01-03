import { TestApiAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { fetchArticlesList } from './fetchArticlesList';
import { mockedArticles } from 'shared/mocks';
import { articleApi, ArticleSortField } from 'entities/Article';
import { http, HttpResponse } from 'msw';
import { articlesPageReducer } from '../../slices/articlesPageSlice';
import { articlesAdapter } from '../../adapters/articlesAdapter';
import { createTestServer } from 'shared/config/tests/createTestServer';
import { API_ROUTES } from 'shared/api';

const server = createTestServer();

describe('fetchArticlesList', () => {
  test('success fetch articles list', async () => {
    server.use(http.get(API_ROUTES.articles(), () => HttpResponse.json(mockedArticles)));
    const thunk = new TestApiAsyncThunk(
      fetchArticlesList,
      articleApi,
      { articlesPage: articlesPageReducer, },
      {
        articlesPage: {
          ...articlesAdapter.getInitialState(),
          limit: 9,
          page: 1,
          search: '',
          sort: ArticleSortField.CREATED,
          order: 'asc',
        },
      });

    const result = await thunk.callThunk(undefined);
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toEqual(mockedArticles);
  });

  test('error fetch articles list', async () => {
    const thunk = new TestApiAsyncThunk(fetchArticlesList,
      articleApi,
      { articlesPage: articlesPageReducer, },
      {
        articlesPage: {
          limit: 9,
        },
      });

    server.use(http.get('http://localhost:8000/articles', () => new HttpResponse(null, { status: 404, })));

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
