import { memo } from 'react';
import cls from './SidebarItem.module.scss';
import { AppLink } from 'shared/ui';
import { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { type SidebarItemType } from 'widgets/Sidebar/model/linkItems';

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo<SidebarItemProps>(function SidebarItem (props) {
  const { t, } = useTranslation();

  return (
    <AppLink
      to={props.item.path}
      theme={AppLinkTheme.SECONDARY}
      className={cls.SidebarItem}
    >
      {props.item.icon}
      {props.collapsed ? null : t(props.item.text)}
    </AppLink>
  );
});
