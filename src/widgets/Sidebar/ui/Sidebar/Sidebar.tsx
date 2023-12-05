import { memo, useCallback } from 'react';
import cls from './Sidebar.module.scss';
import { classNames, useAppSelector, useBoolState } from 'shared/lib';
import {
  Button,
  Flex,
  LanguageSwitcher,
  ThemeSwitcher,
  VStack
} from 'shared/ui';
import { useLinkItems } from '../../model/linkItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getUserAuthData, UserInfo } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config';
import { LoginModal } from 'features/AuthByUsername';

export const Sidebar = memo(function Sidebar () {
  const collapsed = useBoolState(false);
  const linkItems = useLinkItems();
  const user = useAppSelector(getUserAuthData);
  const navigate = useNavigate();
  const {
    enable: openLoginModal,
    boolState: loginModalIsOpen,
    disable: closeLoginModal,
  } = useBoolState(false);

  const onUserInfoClick = useCallback(() => {
    if (user?.id) {
      navigate(RoutePath.profile(user.id));
    } else {
      openLoginModal();
    }
  }, [openLoginModal, navigate, user?.id,]);

  return (
    <VStack
      role="navigation"
      data-testid="sidebar"
      align="center"
      yGap={16}
      className={classNames(cls.Sidebar, {
        [cls.collapsed]: collapsed.boolState,
      })}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={collapsed.toggle}
        className={cls.collapseBtn}
        theme="backgroundInverted"
        size="l"
        square
        rounded
      >
        {collapsed.boolState ? '>' : '<'}
      </Button>

      <UserInfo
        onClick={onUserInfoClick}
        className={cls.userInfo}
        shouldDisplayUsername={!collapsed.boolState}
      />

      <VStack align="start" yGap={32} onClick={collapsed.enable}>
        {linkItems.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed.boolState}
          />
        ))}
      </VStack>

      <Flex
        className={cls.switchers}
        align="center"
        yGap={16}
        xGap={16}
        direction={collapsed.boolState ? 'column' : 'row'}
      >
        <LanguageSwitcher short={collapsed.boolState} />
        <ThemeSwitcher className={cls.themeSwitcher} />
      </Flex>
      <LoginModal open={loginModalIsOpen} onClose={closeLoginModal} />
    </VStack>
  );
});
