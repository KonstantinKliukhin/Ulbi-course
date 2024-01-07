import cls from './NotificationsPopover.module.scss';
import { memo } from 'react';
import { Button, CustomPopover, Drawer, Icon } from 'shared/ui';
import NotificationIcon from '../../../../../public/assets/icons/notification-20-20.svg';
import { BrowserView, MobileView } from 'react-device-detect';
import {
  NotificationList,
  useGetNotificationsQuery
} from 'entities/Notification';
import { type RtkError } from 'shared/types';
import { useBoolState } from 'shared/lib';

export const NotificationsPopover = memo(function NotificationsPopover () {
  const notificationsQueryData = useGetNotificationsQuery(null, { pollingInterval: 5000, });
  const popoverState = useBoolState();

  return (
    <>
      <BrowserView>
        <CustomPopover
          trigger={
            <Button theme="clear" size="content" square>
              <Icon theme="inverted" Svg={NotificationIcon} />
            </Button>
          }
        >
          <NotificationList
            className={cls.notifications}
            isLoading={notificationsQueryData.isLoading}
            error={(notificationsQueryData.error as RtkError)?.message}
            notifications={notificationsQueryData.data}
          />
        </CustomPopover>
      </BrowserView>
      <MobileView>
        <Button theme="clear" size="content" square>
          <Icon theme="inverted" Svg={NotificationIcon} onClick={popoverState.enable} />
        </Button>
        <Drawer open={popoverState.boolState} onClose={popoverState.disable} position="bottom">
          <NotificationList
            className={cls.notifications}
            isLoading={notificationsQueryData.isLoading}
            error={(notificationsQueryData.error as RtkError)?.message}
            notifications={notificationsQueryData.data}
          />
        </Drawer>
      </MobileView>
    </>
  );
});
