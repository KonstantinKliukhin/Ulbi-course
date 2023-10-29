import { type FC, useState } from 'react';
import cls from './Sidebar.module.scss';
import { classNames } from 'shared/lib';
import { AppLink, Button, LanguageSwitcher, ThemeSwitcher } from 'shared/ui';
import { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { AppRoutes, RoutePath } from 'shared/config';
import { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import HomeSVG from '../../../../../public/assets/icons/home.svg';
import InfoSVG from '../../../../../public/assets/icons/info.svg';

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = props => {
  const [collapsed, setCollapsed,] = useState(false);
  const onToggle = (): void => {
    setCollapsed(prev => !prev);
  };
  const { t, } = useTranslation();

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
        <AppLink
          to={RoutePath[AppRoutes.MAIN]}
          theme={AppLinkTheme.SECONDARY}
          className={cls.mainLink}
        >
          <HomeSVG/>
          {collapsed ? null : t('nav_home')}
        </AppLink>
        <AppLink
          className={cls.mainLink}
          to={RoutePath[AppRoutes.ABOUT]}
          theme={AppLinkTheme.SECONDARY}
        >
          <InfoSVG/>
          {collapsed ? null : t('nav_about')}
        </AppLink>
      </div>

      <div className={cls.switchers}>
        <LanguageSwitcher short={collapsed}/>
        <ThemeSwitcher className={cls.themeSwitcher}/>
      </div>
    </div>
  );
};
