import { type ButtonHTMLAttributes, memo } from 'react';
import cls from './Button.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'sizeM',
  L = 'sizeL',
  XL = 'sizeXL',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme
  size?: ButtonSize
  className?: string
  square?: boolean
  rounded?: boolean
  disabled?: boolean
}

export const Button = memo<ButtonProps>(function Button (props) {
  const {
    className,
    children,
    theme = ButtonTheme.CLEAR,
    square,
    rounded,
    size = ButtonSize.M,
    disabled,
    ...buttonProps
  } = props;

  const classNameMods = {
    [cls.square]: square,
    [cls.rounded]: rounded,
    [cls.disabled]: disabled,
  };

  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? 'button'}
      className={classNames(cls.Button, classNameMods, [
        props.className,
        cls[theme],
        cls[size],
      ])}
    >
      {children}
    </button>
  );
});
