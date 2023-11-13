import { memo, useState } from 'react';
import cls from './Sidebar.module.scss';
import { classNames } from 'shared/lib';
import { Button, ButtonSize, ButtonTheme, LanguageSwitcher, ThemeSwitcher } from 'shared/ui';
import { linkItems } from '../../model/linkItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useIsAuthorized } from 'entities/User';

interface SidebarProps {
  className?: string
}

export const Sidebar = memo<SidebarProps>(function Sidebar (props) {
  const [collapsed, setCollapsed,] = useState(false);
  const isAuthorized = useIsAuthorized();
  const onToggle = (): void => {
    setCollapsed(prev => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: collapsed, },
        [props.className,]
      )}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square
        rounded
      >
        {collapsed ? '>' : '<'}
      </Button>

      <div
        className={cls.items}
        onClick={() => {
          setCollapsed(true);
        }}
      >
        {linkItems.map(item => (
          !isAuthorized && item.onlyAuthorized
            ? null
            : <SidebarItem key={item.path} item={item} collapsed={collapsed}/>
        ))}
      </div>

      <div className={cls.switchers}>
        <LanguageSwitcher short={collapsed}/>
        <ThemeSwitcher className={cls.themeSwitcher}/>
      </div>
    </div>
  );
});
