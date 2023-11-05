import { memo, useState } from 'react';
import cls from './Sidebar.module.scss';
import { classNames } from 'shared/lib';
import { Button, LanguageSwitcher, ThemeSwitcher } from 'shared/ui';
import { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { linkItems } from '../../model/linkItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string
}

export const Sidebar = memo<SidebarProps>(function Sidebar (props) {
  const [collapsed, setCollapsed,] = useState(false);
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
        {linkItems.map(item => <SidebarItem key={item.path} item={item} collapsed={collapsed}/>)}
      </div>

      <div className={cls.switchers}>
        <LanguageSwitcher short={collapsed}/>
        <ThemeSwitcher className={cls.themeSwitcher}/>
      </div>
    </div>
  );
});
