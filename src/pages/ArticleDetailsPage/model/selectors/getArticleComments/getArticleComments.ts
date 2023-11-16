import { commentsAdapter } from 'pages/ArticleDetailsPage/model/adapters/commentsAdapter';

export const articleCommentsEntitySelectors = commentsAdapter.getSelectors<StateSchema>(
  state => state.articleComments ?? commentsAdapter.getInitialState()
);

export const getArticleCommentsIsloading = (state: StateSchema) => state.articleComments?.isLoading ?? false;
export const getArticleCommentsError = (state: StateSchema) => state.articleComments?.error ?? null;
