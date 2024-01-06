import { memo } from 'react';
import cls from './Navbar.module.scss';
import { classNames, useAppSelector, useBoolState } from 'shared/lib';
import { Button, HStack } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { getUserAuthData } from 'entities/User';
import { NotificationsPopover } from 'features/ViewNotifications';
import { AvatarDropdown } from 'features/ViewAvatarDropdown';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo<NavbarProps>(function Navbar (props) {
  const userAuthData = useAppSelector(getUserAuthData);
  const isAuthenticated = Boolean(userAuthData);
  const loginModal = useBoolState();
  const { t, } = useTranslation();

  if (isAuthenticated) {
    return (
      <HStack
        as="header"
        align="center"
        justify="end"
        data-testid="navbar"
        xGap={16}
        className={classNames(cls.navbar, {}, [props.className,])}
      >
        <NotificationsPopover/>
        <AvatarDropdown/>
      </HStack>
    );
  } else {
    return (
      <HStack
        align="center"
        justify="end"
        data-testid="navbar"
        className={classNames(cls.navbar, {}, [props.className,])}
      >
        <Button
          theme="clearInverted"
          onClick={loginModal.enable}
        >
          {t('login')}
        </Button>
        <LoginModal open={loginModal.boolState} onClose={loginModal.disable} />
      </HStack>
    );
  }
});
