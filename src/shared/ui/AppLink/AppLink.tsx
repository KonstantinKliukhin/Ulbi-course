import { type FC } from 'react';
import cls from './AppLink.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { Link, type LinkProps } from 'react-router-dom';

type AppLinkTheme = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
  theme?: AppLinkTheme
}

const mapAppLinkThemeClasses: Record<AppLinkTheme, keyof typeof cls> = {
  primary: 'primary',
  secondary: 'secondary',
  red: 'red',
};

export const AppLink: FC<AppLinkProps> = (props) => {
  const { className, children, theme = 'primary', ...linkProps } = props;

  return (
    <Link
      {...linkProps}
      className={classNames(cls.root, {}, [
        className,
        cls[mapAppLinkThemeClasses[theme]],
      ])}
    >
      {children}
    </Link>
  );
};
