import { type FC, useEffect } from 'react';
import {
  useAppDispatch,
  withLazySlices
} from 'shared/lib';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticlesPageHeader } from '../ArticlesPageHeader/ArticlesPageHeader';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { useSearchParams } from 'react-router-dom';
import cls from './ArticlesPage.module.scss';
import { Page } from 'shared/ui';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';

const ArticlesPage: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams,] = useSearchParams();

  useEffect(() => {
    void dispatch(initArticlesPage(searchParams));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Page className={cls.page}>
        <ArticlesPageHeader />
        <ArticlesPageFilters />
        <ArticlesInfiniteList/>
      </Page>
    </>
  );
};

export default withLazySlices({
  reducers: { articlesPage: articlesPageReducer, },
  onlyIfSliceReady: true,
  removeOnUnmount: false,
})(ArticlesPage);
