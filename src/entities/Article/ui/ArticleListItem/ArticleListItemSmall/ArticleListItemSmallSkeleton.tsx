import { type FC } from 'react';
import { Card, Skeleton } from 'shared/ui';
import cls from './ArticleListItemSmall.module.scss';
import { classNames } from 'shared/lib';

interface ArticleListItemSmallSkeletonProps {
  className?: string
}

export const ArticleListItemSmallSkeleton: FC<
ArticleListItemSmallSkeletonProps
> = (props) => (
  <Card className={classNames(cls.ArticleListItemSmall, {}, [props.className,])}>
    <Skeleton width={200} height={200} />
    <div style={{ height: 8, }} />
    <Skeleton width="100%" height={19} />
    <Skeleton className={cls.title} height={28} width="80%" />
  </Card>
);
