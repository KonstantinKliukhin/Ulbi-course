import { type ChangeEvent, type FC, useCallback } from 'react';
import cls from './ArticlesPageFilters.module.scss';
import {
  classNames, useAction, useDebounce
  , useLocalStorage
} from '@/shared/lib';
import {
  type ArticleSortField,
  type ArticleType,
  ArticleView
} from '@/entities/Article';
import { useArticlesPageActions } from '../../model/slices/articlesPageSlice';
import { useArticlesOrder, useArticlesSearch, useArticlesSort, useArticlesType } from '../../model/selectors/getArticlesState/getArticlesState';
import { ArticleViewSelector } from '@/features/SelectArticleView';
import { Card, HStack, Input } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { type SortOrder } from '@/shared/types';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/constants';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { ArticleSortSelector } from '@/features/SelectArticleSort';
import { ArticleTypesTabs } from '@/features/SelectArticleType';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = (props) => {
  const { t, } = useTranslation();
  const [articlesView, setArticlesView,] = useLocalStorage(LOCAL_STORAGE_ARTICLE_VIEW_KEY, ArticleView.SMALL);
  const articlesSort = useArticlesSort();
  const articlesOrder = useArticlesOrder();
  const articlesSearch = useArticlesSearch();
  const articlesType = useArticlesType();
  const fetchArticles = useAction(
    fetchArticlesList,
    useCallback(() => ({ replace: true, }), [])
  );
  const debouncedFetchArticles = useDebounce(fetchArticles, 500);
  const {
    setSort,
    setOrder,
    setSearch,
    setPage,
    setType,
  } = useArticlesPageActions();

  const onChangeOrder = useCallback(
    (order: SortOrder) => {
      setOrder(order);
      setPage(1);
      fetchArticles();
    },
    [fetchArticles, setOrder, setPage,]
  );

  const onChangeSort = useCallback(
    (sort: ArticleSortField) => {
      setSort(sort);
      setPage(1);
      fetchArticles();
    },
    [setSort, setPage, fetchArticles,]
  );

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
      debouncedFetchArticles();
    },
    [debouncedFetchArticles, setSearch, setPage,]
  );

  const onChangeType = useCallback(
    (type: ArticleType) => {
      setType(type);
      setPage(1);
      fetchArticles();
    },
    [setType, setPage, fetchArticles,]
  );

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [props.className,])}>
      <HStack justify="between" align="center" className={cls.sortWrapper}>
        <ArticleSortSelector
          sort={articlesSort}
          order={articlesOrder}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector
          className={cls.ArticleViewSelector}
          view={articlesView}
          onSelectView={setArticlesView}
        />
      </HStack>
      <Card>
        <Input
          onChange={onChangeSearch}
          value={articlesSearch}
          label={t('search')}
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
