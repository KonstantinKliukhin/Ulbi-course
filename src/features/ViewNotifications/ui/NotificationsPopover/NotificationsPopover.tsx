import cls from './NotificationsPopover.module.scss';
import { memo } from 'react';
import { CustomPopover, Icon } from 'shared/ui';
import NotificationIcon from '../../../../../public/assets/icons/notification-20-20.svg';
import {
  NotificationList,
  useGetNotificationsQuery
} from 'entities/Notification';
import { type RtkError } from 'shared/types';

export const NotificationsPopover = memo(function NotificationsPopover () {
  const notificationsQueryData = useGetNotificationsQuery(null, { pollingInterval: 5000, });

  return (
    <CustomPopover trigger={<Icon theme="inverted" Svg={NotificationIcon} />}>
      <NotificationList
        className={cls.notifications}
        isLoading={notificationsQueryData.isLoading}
        error={(notificationsQueryData.error as RtkError)?.message}
        notifications={notificationsQueryData.data}
      />
    </CustomPopover>
  );
});
