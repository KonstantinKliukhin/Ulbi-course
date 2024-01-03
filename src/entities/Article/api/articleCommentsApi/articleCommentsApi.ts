import { $rtkApi, API_ROUTES } from 'shared/api';
import { type Comment, createOptimisticComment } from 'entities/Comment/@x/article';
import { getUserAuthData } from 'entities/User/@x/article';

interface GetArticleCommentsArg {
  articleId: string;
}

interface AddArticleCommentArg {
  articleId: string;
  commentText: string;
  userId: string;
}

export enum ArticleCommentsApiTags {
  ARTICLE_COMMENT = 'ARTICLE_COMMENT'
}

export const articleCommentsApi = $rtkApi.enhanceEndpoints({
  addTagTypes: Object.values<ArticleCommentsApiTags>(ArticleCommentsApiTags),
})
  .injectEndpoints({
    endpoints: (build) => ({
      getArticleComments: build.query<Comment[], GetArticleCommentsArg>({
        query: (arg) => ({
          url: API_ROUTES.comments(),
          params: {
            articleId: arg.articleId,
            _expand: 'user',
          },
        }),
        providesTags: (result = [], __, arg) => [
          ArticleCommentsApiTags.ARTICLE_COMMENT,
          ...result
            ?.map(comment => ({ id: comment.id, type: ArticleCommentsApiTags.ARTICLE_COMMENT, })) ?? [],
        ],
      }),
      addArticleComment: build.mutation<Comment, AddArticleCommentArg>({
        query: (arg) => ({
          url: API_ROUTES.comments(),
          method: 'POST',
          body: {
            articleId: arg.articleId,
            userId: arg.userId,
            text: arg.commentText,
          },
          params: {
            _expand: 'user',
          },
        }),
        // optimistic update
        async onQueryStarted (arg, { dispatch, queryFulfilled, getState, }) {
          const state = getState() as StateSchema;
          const user = getUserAuthData(state);
          if (user) {
            const patchResult = dispatch(
              articleCommentsApi.util.updateQueryData(
                'getArticleComments',
                { articleId: arg.articleId, },
                (draft) => [
                  ...draft, createOptimisticComment({ text: arg.commentText, user, }),
                ]
              ));
            queryFulfilled.catch(patchResult.undo);
          }
        },
      }),
    }),
  });

export const {
  useGetArticleCommentsQuery,
  useAddArticleCommentMutation,
} = articleCommentsApi;
