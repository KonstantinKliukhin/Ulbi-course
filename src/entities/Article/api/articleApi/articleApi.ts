import { $rtkApi, API_ROUTES } from '@/shared/api';
import { type Article, type ArticleSortField, ArticleType } from '../../model/types/article';
import { type ArticleDTO } from '../../model/types/article.dto';
import { type SortOrder } from '@/shared/types';

interface GetArticleByIdArg {
  id: string;
}

export interface GetArticlesArg {
  limit?: number;
  page?: number;
  sort?: ArticleSortField;
  order?: SortOrder;
  search?: string;
  type?: ArticleType;
}

interface UpdateArticleArg {
  article: ArticleDTO;
  oldArticle: Article;
}

interface CreateArticleArg {
  article: ArticleDTO;
}

export enum ArticleApiTags {
  ARTICLE = 'ARTICLE',
}

export const articleApi = $rtkApi.enhanceEndpoints({
  addTagTypes: Object.values<ArticleApiTags>(ArticleApiTags),
})
  .injectEndpoints({
    endpoints: (build) => ({
      getArticleById: build.query<Article, GetArticleByIdArg>({
        query: (arg) => ({
          url: API_ROUTES.articles(arg.id),
          params: {
            _expand: 'user',
          },
        }),
        providesTags: (_, __, arg) => [{
          id: arg.id, type: ArticleApiTags.ARTICLE,
        },],
      }),
      getArticles: build.query<Article[], GetArticlesArg>({
        query: (arg) => ({
          url: API_ROUTES.articles(),
          params: {
            _expand: 'user',
            _page: arg.page,
            _limit: arg.limit,
            _sort: arg.sort,
            _order: arg.order,
            q: arg.search,
            type: arg.type === ArticleType.ALL ? undefined : arg.type,
          },
        }),
        providesTags: (articles) =>
          articles
            ? [
                ...articles.map(({ id, }) => ({ type: ArticleApiTags.ARTICLE, id, })),
                { type: ArticleApiTags.ARTICLE, id: 'PARTIAL-LIST', },
              ]
            : [{ type: ArticleApiTags.ARTICLE, id: 'PARTIAL-LIST', },],
      }),
      updateArticle: build.mutation<Article, UpdateArticleArg>({
        query: (arg) => ({
          url: API_ROUTES.articles(arg.oldArticle.id),
          method: 'PATCH',
          body: arg.article,
        }),
        invalidatesTags: (_, __, arg) => [{
          type: ArticleApiTags.ARTICLE,
          id: arg.oldArticle.id,
        },],
      }),
      createArticle: build.mutation<Article, CreateArticleArg>({
        query: (arg) => ({
          url: API_ROUTES.articles(),
          method: 'POST',
          body: arg.article,
        }),
        invalidatesTags: [ArticleApiTags.ARTICLE,],
      }),
    }),
  });

export const {
  useGetArticleByIdQuery,
  useGetArticlesQuery,
  useUpdateArticleMutation,
  useCreateArticleMutation,
} = articleApi;
