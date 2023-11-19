import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useIsMounted } from 'shared/lib';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from 'shared/constants';
import { ArticleView } from 'entities/Article';
import { getArticlesView } from '../../selectors/getArticlesState/getArticlesState';

const articleViews = Object.values(ArticleView);

const getIsArticleView = (value: string): value is ArticleView => articleViews.includes(value as ArticleView);

export const useArticleViewStorage = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector(getArticlesView);
  const isMounted = useIsMounted();

  useEffect(function initArticleView () {
    const savedValue = localStorage.getItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY);

    if (savedValue && getIsArticleView(savedValue)) {
      dispatch(articlesPageActions.setView(savedValue));
    }
  }, [dispatch,]);

  useEffect(function saveArticleView () {
    if (isMounted.current) {
      localStorage.setItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY, view);
    }
  }, [view,]);
};
