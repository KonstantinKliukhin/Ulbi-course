import React, { type FC } from 'react';
import { Card, Icon, Skeleton } from 'shared/ui';
import cls from './ArticleListItemBig.module.scss';
import EyeSvg from '../../../../../../public/assets/icons/eye-20-20.svg';
import { classNames } from 'shared/lib';

interface ArticleListItemBigSkeletonProps {
  className?: string
}

export const ArticleListItemBigSkeleton: FC<ArticleListItemBigSkeletonProps> = (
  props
) => {
  return (
    <Card className={classNames(cls.ArticleListItemBig, {}, [props.className,])}>
      <div className={cls.header}>
        <Skeleton width={30} height={30} borderRadius="50%" />
        <Skeleton width={80} height={24} />
      </div>
      <div style={{ height: 7, }} />
      <Skeleton width={100} height={25} />
      <Skeleton className={cls.types} width={130} height={25} />
      <Skeleton height={250} width="100%" />
      <div style={{ height: 10, }} />
      <Skeleton width={100} height={22} />
      <div style={{ height: 15, }} />
      <div>
        <Skeleton width="100%" height={19} />
        <div style={{ height: 5, }} />
        <Skeleton width="100%" height={19} />
        <div style={{ height: 5, }} />
        <Skeleton width="100%" height={19} />
        <div style={{ height: 5, }} />
        <Skeleton width="100%" height={19} />
        <div style={{ height: 5, }} />
        <Skeleton width="100%" height={19} />
      </div>

      <div className={cls.footer}>
        <Skeleton width={150} height={40} />

        <div className={cls.viewsWrapper}>
          <Skeleton width={50} height={19} />
          <Icon Svg={EyeSvg} />
        </div>
      </div>
    </Card>
  );
};
