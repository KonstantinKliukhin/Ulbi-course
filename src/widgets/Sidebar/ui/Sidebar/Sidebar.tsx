import { memo, useCallback } from 'react';
import cls from './Sidebar.module.scss';
import { classNames, useAppSelector, useBoolState } from 'shared/lib';
import { Button, ButtonSize, ButtonTheme, LanguageSwitcher, ThemeSwitcher } from 'shared/ui';
import { useLinkItems } from '../../model/linkItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getUserAuthData, UserInfo } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config';
import { LoginModal } from 'features/AuthByUsername';

interface SidebarProps {
  className?: string
}

export const Sidebar = memo<SidebarProps>(function Sidebar (props) {
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
    <nav
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: collapsed.boolState, },
        [props.className,]
      )}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={collapsed.toggle}
        className={cls.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
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

      <div
        className={cls.items}
        onClick={collapsed.enable}
      >
        {linkItems.map(item => <SidebarItem key={item.path} item={item} collapsed={collapsed.boolState}/>)}
      </div>

      <div className={cls.switchers}>
        <LanguageSwitcher short={collapsed.boolState}/>
        <ThemeSwitcher className={cls.themeSwitcher}/>
      </div>
      <LoginModal open={loginModalIsOpen} onClose={closeLoginModal}/>
    </nav>
  );
});
