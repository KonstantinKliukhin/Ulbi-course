import { memo } from 'react';
import cls from './UserInfo.module.scss';
import { classNames } from '@/shared/lib';
import { Avatar, Text } from '@/shared/ui';
import { useUserAuthData } from '../../model/selectors/getUserAuthData/getUserAuthData';

interface UserInfoProps {
  className?: string;
  avatarSize?: number;
  shouldDisplayUsername?: boolean;
  onClick?: () => void;
}

export const UserInfo = memo<UserInfoProps>(function UserInfo (props) {
  const { avatarSize = 30, shouldDisplayUsername = true, } = props;
  const user = useUserAuthData();

  return (
    <div className={classNames(cls.UserInfo, {}, [props.className,])} onClick={props.onClick}>
      <Avatar src={user?.avatar} size={avatarSize}/>
      {shouldDisplayUsername ? <Text text={user?.username} textClassName={cls.username}/> : false}
    </div>
  );
});
