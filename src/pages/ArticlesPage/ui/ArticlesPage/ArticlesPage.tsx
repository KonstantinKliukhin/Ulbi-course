import { type FC, useCallback } from 'react';
import { ArticleList, type ArticleView } from 'entities/Article';
import { useAppDispatch, useAppSelector, useInitialEffect, withLazySlices } from 'shared/lib';
import { articlesPageActions, articlesPageReducer } from '../../model/slices/articlesPageSlice';
import {
  getArticlesError,
  getArticlesIsLoading,
  getArticlesState,
  getArticlesView
} from '../../model/selectors/getArticlesState/getArticlesState';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import cls from './ArticlesPage.module.scss';
import { useSaveItemToStorage } from '../../lib/articleStorage/articleStorage';
import { PageWithInfiniteScroll } from 'shared/ui';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

const ArticlesPage: FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(getArticlesState.selectAll);
  const articleView = useAppSelector(getArticlesView);
  const articlesIsLoading = useAppSelector(getArticlesIsLoading);
  const articlesError = useAppSelector(getArticlesError);
  useSaveItemToStorage(articleView);

  useInitialEffect(useCallback(() => {
    void dispatch(initArticlesPage());
  }, [dispatch,]));

  const onSelectView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch,]);

  const onLoadNextPart = useCallback(() => {
    void dispatch(fetchNextArticlesPage());
  }, [dispatch,]);

  return (
    <PageWithInfiniteScroll onScrollEnd={onLoadNextPart}>
      <ArticleViewSelector
        className={cls.ArticleViewSelector}
        view={articleView}
        onSelectView={onSelectView}
      />
      <ArticleList
        error={articlesError}
        articles={articles}
        view={articleView}
        isLoading={articlesIsLoading}
      />
    </PageWithInfiniteScroll>
  );
};

export default withLazySlices({
  reducers: { articlesPage: articlesPageReducer, },
  onlyIfSliceReady: true,
})(ArticlesPage);
