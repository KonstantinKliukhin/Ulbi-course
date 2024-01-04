import { memo } from 'react';
import cls from './Navbar.module.scss';
import { addOptionallyToArray, classNames, useAppSelector, useBoolState } from 'shared/lib';
import { Button, HStack } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { getIsAdminUser, getIsManagerUser, getUserAuthData, useLogout, UserInfo } from 'entities/User';
import { DropDown } from 'shared/ui/DropDown/DropDown';
import { RoutePath } from 'shared/config';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo<NavbarProps>(function Navbar (props) {
  const userAuthData = useAppSelector(getUserAuthData);
  const isAdmin = useAppSelector(getIsAdminUser);
  const isManager = useAppSelector(getIsManagerUser);
  const isAuthenticated = Boolean(userAuthData);
  const logout = useLogout();
  const loginModal = useBoolState();
  const { t, } = useTranslation();

  if (isAuthenticated && userAuthData?.id) {
    return (
      <HStack
        role="banner"
        align="center"
        justify="end"
        data-testid="navbar"
        className={classNames(cls.navbar, {}, [props.className,])}
      >
        <DropDown
          buttonContent={<UserInfo className={cls.userInfo} shouldDisplayUsername={false}/>}
          items={[
            ...addOptionallyToArray(isAdmin || isManager, {
              content: t('nav_admin'),
              link: RoutePath.adminPanel,
            }),
            {
              content: t('logout'),
              onClick: logout,
            },
            {
              link: RoutePath.profile(userAuthData.id),
              content: t('nav_profile'),
            },
          ]}
        />
      </HStack>
    );
  }

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
});
