import React, { memo, useCallback } from 'react';
import { RatingCard } from '@/entities/Rating';
import { useTranslation } from 'react-i18next';
import { useGetArticleRatingQuery, useRateArticleMutation } from '../../api/articleRatingApi';
import { useUserAuthData } from '@/entities/User';

interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo<ArticleRatingProps>(function ArticleRating (props) {
  const { t, } = useTranslation('article');
  const user = useUserAuthData();
  const articleRatingQueryData = useGetArticleRatingQuery(
    { articleId: props.articleId, userId: user?.id ?? '', },
    { skip: !user?.id, }
  );

  const [rateArticle,] = useRateArticleMutation();

  const onAccept = useCallback((rate: number, feedback?: string) => {
    void rateArticle({ articleId: props.articleId, userId: user?.id ?? '', rating: { rate, feedback, }, });
  }, [props.articleId, rateArticle, user?.id,]);

  const onCancel = useCallback((rate: number) => {
    void rateArticle({ articleId: props.articleId, userId: user?.id ?? '', rating: { rate, }, });
  }, [props.articleId, rateArticle, user?.id,]);

  return (
    <RatingCard
      className={props.className}
      hasFeedback
      rate={articleRatingQueryData.data?.rate}
      isRatingLoading={articleRatingQueryData.isLoading}
      title={t('article_rating_title')}
      feedbackTitle={t('article_leave_feedback_title')}
      onAccept={onAccept}
      onCancel={onCancel}
    />
  );
});

export default ArticleRating;
