import { type FC } from 'react';
import cls from './CommentCard.module.scss';
import { Card, HStack, Skeleton } from 'shared/ui';

export const CommentCardSkeleton: FC = () => (
  <Card theme="outlined" className={cls.CommentCard}>
    <HStack align="center" xGap={16}>
      <Skeleton width={45} height={45} borderRadius="50%"/>
      <Skeleton width={100} height={32}/>
    </HStack>
    <Skeleton className={cls.text} width="100%" height={24}/>
    <Skeleton className={cls.text} width="100%" height={24}/>
  </Card>
);
