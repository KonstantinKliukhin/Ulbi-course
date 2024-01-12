import { useAction, useAppSelector, useDebounce, useLocalStorage } from '@/shared/lib';
import { type FC, useCallback } from 'react';
import { ArticleList, ArticleView } from '@/entities/Article';
import { DEFAULT_ARTICLES_LIMIT } from '../../model/constants';
import {
  useFirstArticlesPageSavedItemIndex
} from '../../model/hooks/useArticlesPageSavedItemIndex/useFirstArticlesPageSavedItemIndex';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import { type ListRange } from 'react-virtuoso';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/constants';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
  getArticlesState, useArticlesError, useArticlesHasMore, useArticlesIsLoading
} from '../../model/selectors/getArticlesState/getArticlesState';

export const ArticlesInfiniteList: FC = function ArticlesInfiniteList () {
  const savedItemIndex = useFirstArticlesPageSavedItemIndex();
  const articles = useAppSelector(getArticlesState.selectAll);
  const isLoading = useArticlesIsLoading();
  const error = useArticlesError();
  const hasMore = useArticlesHasMore();
  const onScrollRangeChanged = useAction(
    articlesPageActions.setSavedItemIndex,
    useCallback((range: ListRange) => range.startIndex, [])
  );
  const fetchNextArticles = useAction(fetchNextArticlesPage);
  const [articlesView,] = useLocalStorage(LOCAL_STORAGE_ARTICLE_VIEW_KEY, ArticleView.SMALL);

  const onScrollEnd = useDebounce(useCallback(() => {
    if (!isLoading && hasMore) {
      fetchNextArticles();
    }
  }, [hasMore, isLoading, fetchNextArticles,]), 100);

  return (
    <ArticleList
      onScrollRangeChanged={onScrollRangeChanged}
      savedItemIndex={savedItemIndex}
      skeletonsCount={DEFAULT_ARTICLES_LIMIT}
      endReached={onScrollEnd}
      isLoading={isLoading}
      error={error}
      articles={articles}
      view={articlesView}
      virtualized
    />
  );
};
