import { type Article, articleApi, ArticleApiTags } from 'entities/Article';
import { API_ROUTES } from 'shared/api';

interface GetArticleRecommendationsArg {
  limit: number;
}

export const recommendationsApi = articleApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendations: build.query<Article[], GetArticleRecommendationsArg>({
      query: (arg) => ({
        url: API_ROUTES.articles(),
        params: {
          _limit: arg.limit,
        },
      }),
      providesTags: (result) => [
        ArticleApiTags.ARTICLE,
        ...result?.map(article => ({ id: article.id, type: ArticleApiTags.ARTICLE, })) ?? [],
      ],
    }),
  }),
});

export const { useGetArticleRecommendationsQuery, } = recommendationsApi;
