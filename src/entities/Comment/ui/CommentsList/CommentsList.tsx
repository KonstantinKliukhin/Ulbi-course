import { type FC } from 'react';
import cls from './CommentList.module.scss';
import { classNames, withError, withLoading } from 'shared/lib';
import { type Comment } from '../../model/types/comment';
import { Text } from 'shared/ui';
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

const CommentsList: FC<CommentListProps> = props => {
  const { t, } = useTranslation('comment');

  return (
    <div className={classNames(cls.CommentsList, {}, [props.className,])}>
      {props.comments?.length
        ? <>{props.comments.map(comment => <CommentCard comment={comment} key={comment.id}/>)}</>
        : <Text title={t('no_comments')}/>
            }
    </div>
  );
};

const composedCommentsList = compose<typeof CommentsList>(
  withError(),
  withLoading({ LoadingComponent: <CommentsListSkeleton/>, })
)(CommentsList);

export { composedCommentsList as CommentsList };
