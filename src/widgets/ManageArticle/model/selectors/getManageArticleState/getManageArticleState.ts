import { type FormMode } from 'shared/types';
import { type ArticleBlock } from 'entities/Article';

export const getBlockFormMode = (state: StateSchema): FormMode =>
  state.manageArticle?.blockFormMode ?? 'none';
export const getManageArticleIsLoading = (state: StateSchema): boolean =>
  state.manageArticle?.isLoading ?? false;
export const getManageArticleError = (state: StateSchema): null | string =>
  state.manageArticle?.error ?? null;
export const getCurrentBlockIndex = (state: StateSchema): number =>
  state.manageArticle?.currentBlockIndex ?? -1;
export const getEditingArticleBlock = (
  state: StateSchema
): ArticleBlock | null => state.manageArticle?.editingArticleBlock ?? null;
