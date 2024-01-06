import cls from './NotificationItem.module.scss';
import { classNames } from 'shared/lib';
import { memo } from 'react';
import { type Notification } from '../../model/types/notification';
import { Card, Text } from 'shared/ui';
import { Link } from 'react-router-dom';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = memo<NotificationItemProps>(function NotificationItem (props) {
  const content = (
    <Card theme="outlined" className={classNames(cls.NotificationItem, {}, [props.className,])}>
      <Text size="s" title={props.notification.title} text={props.notification.description} />
    </Card>
  );

  if (props.notification.href) {
    return (
      <Link to={props.notification.href}>
        {content}
      </Link>
    );
  } else {
    return content;
  }
});
