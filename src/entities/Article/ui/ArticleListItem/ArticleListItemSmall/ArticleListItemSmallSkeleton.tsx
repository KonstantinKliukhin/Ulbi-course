import { type FC } from 'react';
import { Card, Skeleton } from 'shared/ui';
import cls from './ArticleListItemSmall.module.scss';

export const ArticleListItemSmallSkeleton: FC = () => (
  <Card className={cls.ArticleListItemSmall}>
    <Skeleton width={200} height={200}/>
    <div style={{ height: 8, }}/>
    <Skeleton width="100%" height={19}/>
    <Skeleton className={cls.title} height={28} width="80%"/>
  </Card>
);
