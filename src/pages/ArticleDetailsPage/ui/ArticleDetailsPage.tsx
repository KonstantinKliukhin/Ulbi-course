import { type FC, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { ArticleNotFound } from './ArticleNotFound/ArticleNotFound';
import { useTranslation } from 'react-i18next';
import { CommentsList } from 'entities/Comment';
import { Text } from 'shared/ui';
import cls from './ArticleDetailsPage.module.scss';
import { useAppDispatch, useAppSelector, useInitialEffect, withLazySlices } from 'shared/lib';
import { articleCommentsReducer } from '../model/slices/articleCommentsSlice';
import {
  articleCommentsEntitySelectors,
  getArticleCommentsError,
  getArticleCommentsIsloading
} from '../model/selectors/getArticleComments/getArticleComments';
import { fetchArticleComments } from 'pages/ArticleDetailsPage/model/services/fetchArticleComments/fetchArticleComments';

const ArticleDetailsPage: FC = () => {
  const params = useParams<{ id: string }>();
  const { t, } = useTranslation('articleDetails');
  const dispatch = useAppDispatch();
  const comments = useAppSelector(articleCommentsEntitySelectors.selectAll);
  const commentsIsLoading = useAppSelector(getArticleCommentsIsloading);
  const commentsError = useAppSelector(getArticleCommentsError);

  useInitialEffect(useCallback(() => {
    if (params.id) {
      void dispatch(fetchArticleComments(params.id));
    }
  }, [dispatch, params.id,]));

  if (!params.id) return <ArticleNotFound/>;

  return (
    <>
      <ArticleDetails id={params.id}/>
      <Text className={cls.commentsTitle} title={t('comments')}/>
      <CommentsList comments={comments} isLoading={commentsIsLoading} error={commentsError}/>
    </>
  );
};

export default withLazySlices({
  reducers: { articleComments: articleCommentsReducer, },
  onlyIfSliceReady: true,
  removeOnUnmount: true,
})(ArticleDetailsPage);
