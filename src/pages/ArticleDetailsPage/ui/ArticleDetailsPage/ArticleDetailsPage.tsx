import { type FC, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { ArticleNotFound } from '../ArticleNotFound/ArticleNotFound';
import { useTranslation } from 'react-i18next';
import { CommentsList } from 'entities/Comment';
import { Page, Text } from 'shared/ui';
import cls from './ArticleDetailsPage.module.scss';
import { useAppDispatch, useAppSelector, useInitialEffect, withLazySlices } from 'shared/lib';
import { articleCommentsReducer } from '../../model/slices/articleCommentsSlice';
import {
  articleCommentsEntitySelectors,
  getAddCommentError,
  getAddCommentIsLoading,
  getArticleCommentsError,
  getArticleCommentsIsLoading
} from 'pages/ArticleDetailsPage/model/selectors/getArticleCommentsState/getArticleCommentsState';
import { fetchArticleComments } from '../../model/services/fetchArticleComments/fetchArticleComments';
import { AddCommentForm } from 'features/AddCommentForm';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { ArticleRecommendations } from 'features/ArticleRecomemndations';

const ArticleDetailsPage: FC = () => {
  const params = useParams<{ id: string }>();
  const { t, } = useTranslation('article');
  const dispatch = useAppDispatch();
  const comments = useAppSelector(articleCommentsEntitySelectors.selectAll);
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading);
  const commentsError = useAppSelector(getArticleCommentsError);
  const addCommentIsLoading = useAppSelector(getAddCommentIsLoading);
  const addCommentError = useAppSelector(getAddCommentError);

  useInitialEffect(useCallback(() => {
    if (params.id) {
      void dispatch(fetchArticleComments(params.id));
    }
  }, [dispatch, params.id,]));

  const onSendComment = useCallback((text: string) => {
    void dispatch(addCommentForArticle(text));
  }, [dispatch,]);

  if (!params.id) return <ArticleNotFound/>;

  return (
    <Page>
      <ArticleDetails id={params.id}/>
      <ArticleRecommendations/>
      <Text className={cls.commentsTitle} title={t('comments')}/>
      <AddCommentForm
        error={addCommentError}
        isLoading={addCommentIsLoading}
        className={cls.commentsForm}
        onSendComment={onSendComment}
      />
      <CommentsList comments={comments} isLoading={commentsIsLoading} error={commentsError}/>
    </Page>
  );
};

export default withLazySlices({
  reducers: { articleComments: articleCommentsReducer, },
  onlyIfSliceReady: true,
  removeOnUnmount: true,
})(ArticleDetailsPage);
