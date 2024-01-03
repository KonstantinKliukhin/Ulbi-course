import { type Article, articleApi } from 'entities/Article';
import { API_ROUTES } from 'shared/api';

const addArticleViewApi = articleApi.injectEndpoints({
  endpoints: (build) => ({
    addView: build.mutation<undefined, Article>({
      query: (article) => ({
        url: API_ROUTES.articles(article.id),
        method: 'PATCH',
        body: {
          views: article.views + 1,
        },
      }),
    }),
  }),
});

export const { useAddViewMutation, } = addArticleViewApi;
