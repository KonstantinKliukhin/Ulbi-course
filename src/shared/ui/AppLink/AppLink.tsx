import { type FC, useCallback } from 'react';
import cls from './AppLink.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import { type LinkProps, NavLink } from 'react-router-dom';

type AppLinkTheme = 'primary' | 'secondary' | 'red' | 'clear';

interface AppLinkProps extends LinkProps {
  theme?: AppLinkTheme;
  activeClassName?: string;
}

const mapAppLinkThemeClasses: Record<AppLinkTheme, keyof typeof cls> = {
  primary: 'primary',
  secondary: 'secondary',
  red: 'red',
  clear: 'clear',
};

type GetLinkClassName = (props: {
  isActive: boolean;
  isPending: boolean;
}) => string | undefined;

export const AppLink: FC<AppLinkProps> = (props) => {
  const { className, children, activeClassName, theme = 'primary', ...linkProps } = props;

  const getLinkClassName: GetLinkClassName = useCallback((arg) => classNames(
    cls.AppLink,
    { [cls.active]: arg.isActive, [activeClassName ?? '']: arg.isActive, },
    [className, cls[mapAppLinkThemeClasses[theme]],]
  ), [className, theme, activeClassName,]);

  return (
    <NavLink
      {...linkProps}
      className={getLinkClassName}
    >
      {children}
    </NavLink>
  );
};
