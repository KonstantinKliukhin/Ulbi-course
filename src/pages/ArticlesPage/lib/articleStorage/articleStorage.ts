import { ArticleView } from 'entities/Article';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from 'shared/constants';
import { usePrevious } from 'shared/lib';

const ARTICLE_VIEW_DEFAULT_VALUE = ArticleView.SMALL;

const articleViews = Object.values(ArticleView);

const getIsArticleView = (value: string): value is ArticleView => articleViews.includes(value as ArticleView);

export const getArticleViewFromStorage = (): ArticleView => {
  const savedValue = localStorage.getItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY);

  if (savedValue && getIsArticleView(savedValue)) {
    return savedValue;
  } else {
    return ARTICLE_VIEW_DEFAULT_VALUE;
  }
};

const saveArticlesToStorage = (view: ArticleView) => {
  localStorage.setItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY, view);
};

export const useSaveItemViewToStorage = (view: ArticleView) => {
  const previousView = usePrevious(view);

  if (view !== previousView.current) {
    saveArticlesToStorage(view);
  }
};
