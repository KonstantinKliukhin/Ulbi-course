import cls from './NotificationsPopover.module.scss';
import { memo } from 'react';
import { Button, CustomPopover, Icon, MobileDrawer, Text } from 'shared/ui';
import NotificationIcon from '../../../../../public/assets/icons/notification-20-20.svg';
import { BrowserView, MobileView } from 'react-device-detect';
import {
  NotificationList,
  useGetNotificationsQuery
} from 'entities/Notification';
import { type RtkError } from 'shared/types';
import { useBoolState } from 'shared/lib';
import { useTranslation } from 'react-i18next';

export const NotificationsPopover = memo(function NotificationsPopover () {
  const notificationsQueryData = useGetNotificationsQuery(null, { pollingInterval: 5000, });
  const popoverState = useBoolState();
  const { t, } = useTranslation();

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
            className={cls.desktopNotifications}
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
        <MobileDrawer
          open={popoverState.boolState}
          onClose={popoverState.disable}
          header={<Text size="s" title={t('notifications_title') } />}
        >
          <NotificationList
            className={cls.mobileNotifications}
            isLoading={notificationsQueryData.isLoading}
            error={(notificationsQueryData.error as RtkError)?.message}
            notifications={notificationsQueryData.data}
          />
        </MobileDrawer>
      </MobileView>
    </>
  );
});
