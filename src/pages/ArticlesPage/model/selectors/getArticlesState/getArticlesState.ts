import { articlesAdapter } from '../../adapters/articlesAdapter';
import { ArticleView } from 'entities/Article';

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
