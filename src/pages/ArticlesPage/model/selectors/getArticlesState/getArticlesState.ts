import { articlesAdapter } from '../../adapters/articlesAdapter';
import { ArticleView } from 'entities/Article';

export const getArticlesState = articlesAdapter.getSelectors<StateSchema>(
  state => state.articlesPage ?? articlesAdapter.getInitialState()
);

export const getArticlesIsLoading = (state: StateSchema) => state.articlesPage?.isLoading ?? false;
export const getArticlesError = (state: StateSchema) => state.articlesPage?.error ?? null;
export const getArticlesView = (state: StateSchema) => state.articlesPage?.view ?? ArticleView.SMALL;
