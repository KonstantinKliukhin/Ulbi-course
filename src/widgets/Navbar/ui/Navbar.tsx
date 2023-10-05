import { type FC } from 'react';
import { AppRoutes, RoutePath } from 'shared/config';
import cls from './Navbar.module.scss';
import { classNames } from 'shared/lib';
import { AppLink } from 'shared/ui';
import { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = props => {
  const { t, } = useTranslation();
  return (
    <div className={classNames(cls.navbar, {}, [props.className,])}>
      <div className={cls.links}>
        <AppLink
          to={RoutePath[AppRoutes.MAIN]}
          theme={AppLinkTheme.SECONDARY}
          className={cls.mainLink}
                >
          {t('nav_home')}
        </AppLink>
        <AppLink to={RoutePath[AppRoutes.ABOUT]} theme={AppLinkTheme.SECONDARY}>
          {t('nav_about')}
        </AppLink>
      </div>
    </div>
  );
};
