import { type FC } from 'react';
import cls from './CommentCard.module.scss';
import { classNames } from 'shared/lib';
import { type Comment } from '../../model/types/comment';
import { AppLink, Avatar, Card, HStack, Text } from 'shared/ui';
import { CommentCardSkeleton } from './CommentCardSkeleton';
import { RoutePath } from 'shared/config';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = (props) => {
  if (props.isLoading) return <CommentCardSkeleton />;

  return (
    <Card className={classNames(cls.CommentCard, {}, [props.className,])}>
      <AppLink to={RoutePath.profile(props.comment.user.id)}>
        <HStack align="center" xGap={16}>
          <Avatar size={45} src={props.comment.user.avatar} />
          <Text
            titleClassName={cls.username}
            title={props.comment.user.username}
          />
        </HStack>
      </AppLink>
      <Text className={cls.text} text={props.comment.text} />
    </Card>
  );
};
