import { memo } from 'react';
import cls from './SidebarItem.module.scss';
import { AppLink, HStack } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { type SidebarItemType } from '../../model/types/sidebarItem';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo<SidebarItemProps>(function SidebarItem (props) {
  const { t, } = useTranslation();

  return (
    <AppLink
      to={props.item.path}
      theme="secondary"
      className={cls.SidebarItem}
      activeClassName={cls.active}
    >
      <HStack align="center" xGap={8}>
        {props.item.icon}
        {props.collapsed ? null : t(props.item.text)}
      </HStack>
    </AppLink>
  );
});
