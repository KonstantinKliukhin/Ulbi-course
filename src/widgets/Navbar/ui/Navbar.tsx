import { memo } from 'react';
import cls from './Navbar.module.scss';
import { classNames, useAppSelector, useBoolState } from 'shared/lib';
import { Button } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { getUserAuthData, useLogout } from 'entities/User';

interface NavbarProps {
  className?: string
}

export const Navbar = memo<NavbarProps>(function Navbar (props) {
  const userAuthData = useAppSelector(getUserAuthData);
  const isAuthenticated = Boolean(userAuthData);
  const logout = useLogout();
  const loginModal = useBoolState();
  const { t, } = useTranslation();

  if (isAuthenticated) {
    return (
      <header
        data-testid="navbar"
        className={classNames(cls.navbar, {}, [props.className,])}
      >
        <Button theme="clearInverted" className={cls.links} onClick={logout}>
          {t('logout')}
        </Button>
      </header>
    );
  }

  return (
    <header
      data-testid="navbar"
      className={classNames(cls.navbar, {}, [props.className,])}
    >
      <Button
        theme="clearInverted"
        className={cls.links}
        onClick={loginModal.enable}
      >
        {t('login')}
      </Button>
      <LoginModal open={loginModal.boolState} onClose={loginModal.disable} />
    </header>
  );
});
