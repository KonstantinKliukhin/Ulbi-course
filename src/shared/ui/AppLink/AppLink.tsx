import { type FC } from 'react'
import cls from './AppLink.module.scss'
import { classNames } from 'shared/lib'
import { Link, type LinkProps } from 'react-router-dom'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
  theme?: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = props => {
  const {
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...linkProps
  } = props

  return (
    <Link
      {...linkProps}
      className={classNames(cls.root, {}, [className, cls[theme]])}
        >
      {children}
    </Link>
  )
}
