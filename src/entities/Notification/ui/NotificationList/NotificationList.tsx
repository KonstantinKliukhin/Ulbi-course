import { classNames, withError } from 'shared/lib';
import { memo } from 'react';
import { type Notification } from '../../model/types/notification';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { AsyncContainer, VStack } from 'shared/ui';
import { NotificationListSkeleton } from './NotificationListSkeleton';

interface NotificationProps {
  className?: string;
  notificationClassName?: string;
  notifications?: Notification[];
  isLoading?: boolean;
  error?: string | null;
}

const NotificationList = memo<NotificationProps>(function NotificationList (props) {
  return (
    <VStack yGap={8} align="stretch" className={classNames('', {}, [props.className,])}>
      <AsyncContainer
        isLoading={props.isLoading}
        loadingNode={<NotificationListSkeleton notificationClassName={props.notificationClassName}/>}
      >
        {props.notifications?.map(notification => (
          <NotificationItem
            className={props.notificationClassName}
            notification={notification}
            key={notification.id}
          />
        ))}
      </AsyncContainer>

    </VStack>
  );
});

const WithErrorNotificationList = withError()(NotificationList);
export { WithErrorNotificationList as NotificationList };
