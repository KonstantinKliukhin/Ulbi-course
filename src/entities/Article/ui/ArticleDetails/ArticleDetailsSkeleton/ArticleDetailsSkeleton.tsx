import { type FC } from 'react';
import cls from './ArticleDetailsSkeleton.module.scss';
import { classNames } from 'shared/lib';
import { Skeleton } from 'shared/ui';

export const ArticleDetailsSkeleton: FC = () => (
  <div className={classNames(cls.ArticleDetailsSkeleton)}>
    <Skeleton
      height={200}
      width={200}
      borderRadius="50%"
      centered
    />
    <Skeleton height={32} width={300}/>
    <Skeleton height={24} width={600}/>
    <Skeleton height={200} width="100%"/>
    <Skeleton height={200} width="100%"/>
  </div>
);
