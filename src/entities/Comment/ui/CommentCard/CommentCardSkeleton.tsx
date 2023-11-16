import { type FC } from 'react';
import cls from './CommentCard.module.scss';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';

export const CommentCardSkeleton: FC = () => (
  <div className={cls.CommentCardSkeleton}>
    <div className={cls.header}>
      <Skeleton width={45} height={45} borderRadius="50%"/>
      <Skeleton width={100} height={32}/>
    </div>
    <Skeleton className={cls.text} width="100%" height={24}/>
    <Skeleton className={cls.text} width="100%" height={24}/>
  </div>
);
