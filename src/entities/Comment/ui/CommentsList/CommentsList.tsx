import { type FC, Fragment } from 'react';
import { withError, withLoading } from 'shared/lib';
import { type Comment } from '../../model/types/comment';
import { Text, VStack } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { CommentCard } from '../CommentCard/CommentCard';
import { CommentsListSkeleton } from './CommentsListSkeleton';
import { compose } from '@reduxjs/toolkit';

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
  error?: null | string
}

const CommentsList: FC<CommentListProps> = (props) => {
  const { t, } = useTranslation('comment');

  return (
    <VStack align="start" yGap={16} className={props.className}>
      {props.comments?.length
        ? (
          <Fragment>
            {props.comments.map((comment) => (
              <CommentCard comment={comment} key={comment.id} />
            ))}
          </Fragment>
          )
        : (
          <Text title={t('no_comments')} />
          )}
    </VStack>
  );
};

const composedCommentsList = compose<typeof CommentsList>(
  withError(),
  withLoading({ LoadingComponent: <CommentsListSkeleton />, })
)(CommentsList);

export { composedCommentsList as CommentsList };
