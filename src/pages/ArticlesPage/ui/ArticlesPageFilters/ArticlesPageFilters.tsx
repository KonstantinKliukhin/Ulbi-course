import { type ChangeEvent, type FC, useCallback } from 'react';
import cls from './ArticlesPageFilters.module.scss';
import {
  classNames, useAction,
  useActions,
  useAppSelector, useDebounce
  , useLocalStorage
} from 'shared/lib';
import {
  type ArticleSortField,
  ArticleSortSelector,
  type ArticleType,
  ArticleTypesTabs, ArticleView
} from 'entities/Article';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import {
  getArticlesOrder,
  getArticlesSearch,
  getArticlesSort,
  getArticlesType
} from '../../model/selectors/getArticlesState/getArticlesState';
import { ArticleViewSelector } from 'features/SelectArticleView';
import { Card, HStack, Input } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { type SortOrder } from 'shared/types';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from 'shared/constants';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = (props) => {
  const { t, } = useTranslation();
  const [articlesView, setArticlesView,] = useLocalStorage(LOCAL_STORAGE_ARTICLE_VIEW_KEY, ArticleView.SMALL);
  const articlesSort = useAppSelector(getArticlesSort);
  const articlesOrder = useAppSelector(getArticlesOrder);
  const articlesSearch = useAppSelector(getArticlesSearch);
  const articlesType = useAppSelector(getArticlesType);
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
  } = useActions(articlesPageActions);

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
