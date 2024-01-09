import {
  ArticleSortField,
  ArticleType,
  ArticleView
} from '@/entities/Article';
import { articlesAdapter } from '../../adapters/articlesAdapter';

export const getArticlesState = articlesAdapter.getSelectors<StateSchema>(
  state => state.articlesPage ?? articlesAdapter.getInitialState()
);

export const getArticlesIsLoading = (state: StateSchema) => state.articlesPage?.isLoading ?? false;
export const getArticlesError = (state: StateSchema) => state.articlesPage?.error ?? null;
export const getArticlesView = (state: StateSchema) => state.articlesPage?.view ?? ArticleView.SMALL;
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page ?? 1;
export const getArticlesLimit = (state: StateSchema) => state.articlesPage?.limit ?? 9;
export const getArticlesHasMore = (state: StateSchema) => state.articlesPage?.hasMore ?? false;
export const getArticlesStateInited = (state: StateSchema) => state.articlesPage?._inited ?? false;
export const getArticlesSort = (state: StateSchema) => state.articlesPage?.sort ?? ArticleSortField.CREATED;
export const getArticlesOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc';
export const getArticlesSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
export const getArticlesType = (state: StateSchema) => state.articlesPage?.type ?? ArticleType.ALL;
export const getArticlesPageSavedItemIndex = (state: StateSchema) => state.articlesPage?.saveItemIndex ?? 0;
