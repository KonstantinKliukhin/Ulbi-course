import { type ButtonHTMLAttributes, type FC } from 'react';
import cls from './Button.module.scss';
import { classNames } from 'shared/lib';

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'sizeM',
  L = 'sizeL',
  XL = 'sizeXL'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme
  size?: ButtonSize
  className?: string
  square?: boolean
  rounded?: boolean
}

export const Button: FC<ButtonProps> = props => {
  const {
    className,
    children,
    theme = ButtonTheme.CLEAR,
    square,
    rounded,
    size = ButtonSize.M,
    ...buttonProps
  } = props;

  const classNameMods = {
    [cls.square]: square,
    [cls.rounded]: rounded,
  };

  return (
    <button
      {...buttonProps}
      className={classNames(cls.Button, classNameMods, [props.className, cls[theme], cls[size],])}>
      {children}
    </button>
  );
};
