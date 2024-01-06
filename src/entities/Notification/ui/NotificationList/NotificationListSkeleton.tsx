import { memo } from 'react';
import { NotificationItemSkeleton } from '../NotificationItem/NotificationItemSkeleton';

interface NotificationListSkeletonProps {
  notificationClassName?: string;
}

export const NotificationListSkeleton = memo<NotificationListSkeletonProps>(
  function NotificationListSkeleton (props) {
    return (
      <>
        {new Array(11).fill(null).map((_, index) => (
          <NotificationItemSkeleton key={index} className={props.notificationClassName} />
        ))}
      </>
    );
  });
