import { type FC, useCallback, useRef } from 'react';
import { ArticleList } from 'entities/Article';
import {
  useAppDispatch,
  useAppSelector,
  useInitialEffect,
  withLazySlices
} from 'shared/lib';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import {
  getArticlesError,
  getArticlesIsLoading,
  getArticlesState,
  getArticlesView
} from '../../model/selectors/getArticlesState/getArticlesState';
import { useSaveItemToStorage } from '../../lib/articleStorage/articleStorage';
import { PageWithInfiniteScroll } from 'widgets/InfiniteScroll';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { useSearchParams } from 'react-router-dom';
import { ArticlesPageHeader } from '../ArticlesPageHeader/ArticlesPageHeader';

const ArticlesPage: FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(getArticlesState.selectAll);
  const articleView = useAppSelector(getArticlesView);
  const articlesIsLoading = useAppSelector(getArticlesIsLoading);
  const articlesError = useAppSelector(getArticlesError);
  const [searchParams,] = useSearchParams();
  const pageRef = useRef<HTMLDivElement | null>(null);
  useSaveItemToStorage(articleView);

  useInitialEffect(
    useCallback(() => {
      void dispatch(initArticlesPage(searchParams));
    }, [dispatch, searchParams,])
  );

  const onLoadNextPart = useCallback(() => {
    if (__PROJECT__ !== 'storybook') {
      void dispatch(fetchNextArticlesPage());
    }
  }, [dispatch,]);

  return (
    <>
      <ArticlesPageHeader />
      <ArticlesPageFilters />
      <PageWithInfiniteScroll onScrollEnd={onLoadNextPart} ref={pageRef}>
        <ArticleList
          ref={pageRef}
          error={articlesError}
          articles={articles}
          view={articleView}
          isLoading={articlesIsLoading}
          virtualized
        />
      </PageWithInfiniteScroll>
    </>
  );
};

export default withLazySlices({
  reducers: { articlesPage: articlesPageReducer, },
  onlyIfSliceReady: true,
})(ArticlesPage);
