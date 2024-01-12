import {
  ArticleSortField,
  ArticleType,
  ArticleView
} from '@/entities/Article';
import { articlesAdapter } from '../../adapters/articlesAdapter';
import { buildSelector } from '@/shared/lib';

export const getArticlesState = articlesAdapter.getSelectors<StateSchema>(
  state => state.articlesPage ?? articlesAdapter.getInitialState()
);

export const [useArticlesIsLoading, getArticlesIsLoading,] = buildSelector(
  (state) => state.articlesPage?.isLoading ?? false)
;
export const [useArticlesError, getArticlesError,] = buildSelector(
  (state) => state.articlesPage?.error ?? null
);
export const [useArticlesView, getArticlesView,] = buildSelector(
  (state) => state.articlesPage?.view ?? ArticleView.SMALL
);
export const [useArticlesPageNum, getArticlesPageNum,] = buildSelector(
  (state) => state.articlesPage?.page ?? 1
);
export const [useArticlesLimit, getArticlesLimit,] = buildSelector(
  (state) => state.articlesPage?.limit ?? 9
);
export const [useArticlesHasMore, getArticlesHasMore,] = buildSelector(
  (state) => state.articlesPage?.hasMore ?? false
);
export const [useArticlesStateInited, getArticlesStateInited,] = buildSelector(
  (state) => state.articlesPage?._inited ?? false
);
export const [useArticlesSort, getArticlesSort,] = buildSelector(
  (state) => state.articlesPage?.sort ?? ArticleSortField.CREATED
);
export const [useArticlesOrder, getArticlesOrder,] = buildSelector(
  (state) => state.articlesPage?.order ?? 'asc'
);
export const [useArticlesSearch, getArticlesSearch,] = buildSelector(
  (state) => state.articlesPage?.search ?? ''
);
export const [useArticlesType, getArticlesType,] = buildSelector(
  (state) => state.articlesPage?.type ?? ArticleType.ALL
);
export const [useArticlesPageSavedItemIndex, getArticlesPageSavedItemIndex,] = buildSelector(
  (state) => state.articlesPage?.saveItemIndex ?? 0
);
