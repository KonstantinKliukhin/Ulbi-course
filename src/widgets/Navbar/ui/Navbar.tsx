import { memo } from 'react';
import cls from './Navbar.module.scss';
import { classNames, useAppSelector, useBoolState } from 'shared/lib';
import { Button } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';
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
      <div className={classNames(cls.navbar, {}, [props.className,])}>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.links}
          onClick={logout}
        >
          {t('logout')}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(cls.navbar, {}, [props.className,])}>
      <Button theme={ButtonTheme.CLEAR_INVERTED} className={cls.links} onClick={loginModal.enable}>
        {t('login')}
      </Button>
      {loginModal.boolState ? <LoginModal open={loginModal.boolState} onClose={loginModal.disable}/> : null}
    </div>
  );
});
