import { memo } from 'react';
import cls from './Sidebar.module.scss';
import { classNames, useBoolState } from 'shared/lib';
import { Button, ButtonSize, ButtonTheme, LanguageSwitcher, ThemeSwitcher } from 'shared/ui';
import { useLinkItems } from '../../model/linkItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string
}

export const Sidebar = memo<SidebarProps>(function Sidebar (props) {
  const collapsed = useBoolState(false);
  const linkItems = useLinkItems();

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
    </nav>
  );
});
