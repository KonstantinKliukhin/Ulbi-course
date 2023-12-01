import { type ChangeEvent, type FC, useCallback } from 'react';
import cls from './ArticlesPageFilters.module.scss';
import { classNames, useAction, useActions, useAppSelector, useDebounce } from 'shared/lib';
import { type ArticleSortField, ArticleSortSelector, type ArticleType, ArticleTypesTabs } from 'entities/Article';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import {
  getArticlesOrder,
  getArticlesSearch,
  getArticlesSort,
  getArticlesType,
  getArticlesView
} from '../../model/selectors/getArticlesState/getArticlesState';
import { ArticleViewSelector } from 'features/SelectArticleView';
import { Card, Input } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { type SortOrder } from 'shared/types';

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = props => {
  const { t, } = useTranslation();
  const articlesView = useAppSelector(getArticlesView);
  const articlesSort = useAppSelector(getArticlesSort);
  const articlesOrder = useAppSelector(getArticlesOrder);
  const articlesSearch = useAppSelector(getArticlesSearch);
  const articlesType = useAppSelector(getArticlesType);
  const {
    setView,
    setSort,
    setOrder,
    setSearch,
    setPage,
    setType,
  } = useActions(articlesPageActions);
  const fetchArticles = useAction(
    fetchArticlesList,
    useCallback(() => ({ replace: true, }), [])
  );
  const debouncedFetchArticles = useDebounce(fetchArticles, 500);

  const onChangeOrder = useCallback((order: SortOrder) => {
    setOrder(order);
    setPage(1);
    fetchArticles();
  }, [setOrder, setPage, fetchArticles,]);

  const onChangeSort = useCallback((sort: ArticleSortField) => {
    setSort(sort);
    setPage(1);
    fetchArticles();
  }, [setSort, setPage, fetchArticles,]);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
    debouncedFetchArticles();
  }, [setSearch, setPage, debouncedFetchArticles,]);

  const onChangeType = useCallback((type: ArticleType) => {
    setType(type);
    setPage(1);
    fetchArticles();
  }, [setType, setPage, fetchArticles,]);

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [props.className,])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          sort={articlesSort}
          order={articlesOrder}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector
          className={cls.ArticleViewSelector}
          view={articlesView}
          onSelectView={setView}
        />
      </div>
      <Card className={cls.search}>
        <Input
          onChange={onChangeSearch}
          value={articlesSearch}
          label={t('search')}
          noErrorSpace
        />
      </Card>
      <ArticleTypesTabs
        className={cls.tabs}
        value={articlesType}
        onSelectType={onChangeType}
      />
    </div>
  );
};
