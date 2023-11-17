import { commentsAdapter } from '../../adapters/commentsAdapter';

export const articleCommentsEntitySelectors = commentsAdapter.getSelectors<StateSchema>(
  state => state.articleComments ?? commentsAdapter.getInitialState()
);

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articleComments?.isLoading ?? false;
export const getArticleCommentsError = (state: StateSchema) => state.articleComments?.error ?? null;

export const getAddCommentIsLoading =
    (state: StateSchema) => state.articleComments?.addCommentIsLoading ?? false;
export const getAddCommentError = (state: StateSchema) => state.articleComments?.addCommentError ?? null;
