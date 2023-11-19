import { type FC, useCallback } from 'react';
import { ArticleList, type ArticleView } from 'entities/Article';
import { useAppDispatch, useAppSelector, useInitialEffect, withLazySlices } from 'shared/lib';
import { articlesPageActions, articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
  getArticlesError,
  getArticlesIsLoading,
  getArticlesState,
  getArticlesView
} from '../../model/selectors/getArticlesState/getArticlesState';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import cls from './ArticlesPage.module.scss';
import { useArticleViewStorage } from '../../model/hooks/useArticleViewStorage/useArticleViewStorage';

const ArticlesPage: FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(getArticlesState.selectAll);
  const articleView = useAppSelector(getArticlesView);
  const articlesIsLoading = useAppSelector(getArticlesIsLoading);
  const articlesError = useAppSelector(getArticlesError);
  useArticleViewStorage();

  useInitialEffect(useCallback(() => {
    void dispatch(fetchArticlesList());
  }, [dispatch,]));

  const onSelectView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch,]);

  return (
    <>
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
    </>

  );
};

export default withLazySlices({
  reducers: { articlesPage: articlesPageReducer, },
  onlyIfSliceReady: true,
  removeOnUnmount: true,
})(ArticlesPage);
