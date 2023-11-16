import { type FC } from 'react';
import cls from './CommentCard.module.scss';
import { classNames } from 'shared/lib';
import { type Comment } from '../../model/types/comment';
import { Avatar, Text } from 'shared/ui';
import { CommentCardSkeleton } from './CommentCardSkeleton';

interface CommentCardProps {
  className?: string
  comment: Comment
  isLoading?: boolean
}

export const CommentCard: FC<CommentCardProps> = props => {
  if (props.isLoading) return <CommentCardSkeleton/>;
  return (
    <div className={classNames(cls.CommentCard, {}, [props.className,])}>
      <div className={cls.header}>
        <Avatar size={45} src={props.comment.user.avatar}/>
        <Text title={props.comment.user.username}/>
      </div>
      <Text className={cls.text} text={props.comment.text}/>
    </div>
  );
};
