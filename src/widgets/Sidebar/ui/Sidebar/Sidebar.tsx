import { memo } from 'react';
import cls from './Sidebar.module.scss';
import { classNames, useBoolState } from '@/shared/lib';
import {
  Button,
  Flex,
  VStack
} from '@/shared/ui';
import { useLinkItems } from '../../model/linkItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { LanguageSwitcher } from '@/features/ChangeLanguage';
import { ThemeSwitcher } from '@/features/ChangeTheme';

export const Sidebar = memo(function Sidebar () {
  const collapsed = useBoolState(false);
  const linkItems = useLinkItems();

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
        data-testid="sidebarToggle"
        onClick={collapsed.toggle}
        className={cls.collapseBtn}
        theme="backgroundInverted"
        size="l"
        square
        rounded
      >
        {collapsed.boolState ? '>' : '<'}
      </Button>

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
    </VStack>
  );
});
