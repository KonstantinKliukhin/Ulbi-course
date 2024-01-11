import { articleApi } from '@/entities/Article';
import { API_ROUTES } from '@/shared/api';
import type { Rating, RatingDto } from '@/entities/Rating';

interface GetArticleRatingArg {
  articleId: string;
  userId: string;
}

interface RateArticleArg {
  articleId: string;
  userId: string;
  rating: RatingDto;
}

export const articleRatingApi = articleApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating, GetArticleRatingArg>({
      query: (arg) => ({
        url: API_ROUTES.articleRating(),
        params: {
          userId: arg.userId,
          articleId: arg.articleId,
        },
      }),
      transformResponse: (response: Rating[]) => response[0],
    }),
    rateArticle: build.mutation<unknown, RateArticleArg>({
      query: (arg) => ({
        url: API_ROUTES.articleRating(),
        method: 'POST',
        body: {
          userId: arg.userId,
          articleId: arg.articleId,
          feedback: arg.rating.feedback,
          rate: arg.rating.rate,
        },
      }),
    }),
  }),
});

export const {
  useGetArticleRatingQuery,
  useRateArticleMutation,
} = articleRatingApi;
