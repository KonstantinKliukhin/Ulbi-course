import { type ButtonHTMLAttributes, type FC } from 'react'
import cls from './Button.module.scss'
import { classNames } from 'shared/lib'

export enum ThemeButton {
  CLEAR = 'clear',
  NATIVE = 'native',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
}

export const Button: FC<ButtonProps> = props => {
  const {
    className,
    children,
    theme = ThemeButton.CLEAR,
    ...buttonProps
  } = props

  return (
    <button
      {...buttonProps}
      className={classNames(cls.Button, {}, [props.className, cls[theme]])}>
      {children}
    </button>
  )
}
