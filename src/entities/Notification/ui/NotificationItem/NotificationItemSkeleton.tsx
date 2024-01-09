import { Card, Skeleton, VStack } from '@/shared/ui';
import { classNames } from '@/shared/lib';
import cls from './NotificationItem.module.scss';
import { memo } from 'react';

interface NotificationItemSkeletonProps {
  className?: string;
}

export const NotificationItemSkeleton = memo<NotificationItemSkeletonProps>(
  function NotificationItemSkeleton (props) {
    return (
      <Card theme="outlined" className={classNames(cls.NotificationItem, {}, [props.className,])}>
        <VStack yGap={4}>
          <Skeleton height={16} width="100%" />
          <Skeleton height={14} width="100%" />
        </VStack>
      </Card>
    );
  });
