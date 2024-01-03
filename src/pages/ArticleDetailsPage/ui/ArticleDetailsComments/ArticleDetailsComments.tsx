import cls from './ArticleDetailsComments.module.scss';
import { memo } from 'react';
import { Text } from 'shared/ui';
import { AddArticleComment } from 'features/AddArticleComment';
import { CommentsList } from 'entities/Comment';
import { type RtkError } from 'shared/types';
import { useGetArticleCommentsQuery } from 'entities/Article';
import { useTranslation } from 'react-i18next';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo<ArticleDetailsCommentsProps>(
  function ArticleDetailsComments (props) {
    const { t, } = useTranslation('article');

    const articleCommentsData = useGetArticleCommentsQuery(
      { articleId: props.id ?? '', },
      { skip: !props.id, }
    );

    return (
      <div>
        <Text className={cls.commentsTitle} title={t('comments')} />
        <AddArticleComment articleId={props.id} className={cls.commentsForm} />
        <CommentsList
          comments={articleCommentsData.data}
          isLoading={articleCommentsData.isLoading}
          error={(articleCommentsData.error as RtkError)?.message}
        />
      </div>
    );
  });
