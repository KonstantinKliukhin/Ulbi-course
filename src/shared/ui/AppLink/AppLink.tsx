import { type FC } from 'react';
import cls from './AppLink.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { Link, type LinkProps } from 'react-router-dom';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red',
}

interface AppLinkProps extends LinkProps {
  theme?: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...linkProps
  } = props;

  return (
    <Link
      {...linkProps}
      className={classNames(cls.root, {}, [className, cls[theme],])}
    >
      {children}
    </Link>
  );
};
