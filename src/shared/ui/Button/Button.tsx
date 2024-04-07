import { type ButtonHTMLAttributes, memo } from 'react';
import cls from './Button.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import type { TestProps } from '../../types/testProps';

type ButtonTheme =
  | 'clear'
  | 'clearInverted'
  | 'outline'
  | 'outlineRed'
  | 'background'
  | 'backgroundInverted';

type ButtonSize = 'sm' | 'm' | 'l' | 'xl' | 'content';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, TestProps {
  theme?: ButtonTheme;
  size?: ButtonSize;
  className?: string;
  square?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const mapButtonThemeClasses: Record<ButtonTheme, keyof typeof cls> = {
  clear: 'clear',
  clearInverted: 'clearInverted',
  outline: 'outline',
  outlineRed: 'outlineRed',
  background: 'background',
  backgroundInverted: 'backgroundInverted',
};

const mapButtonSizeClasses: Record<ButtonSize, keyof typeof cls> = {
  content: 'sizeContent',
  sm: 'sizeSm',
  m: 'sizeM',
  l: 'sizeL',
  xl: 'sizeXL',
};

export const Button = memo<ButtonProps>(function Button (props) {
  const {
    className,
    children,
    theme = 'clear',
    square,
    rounded,
    size = 'm',
    disabled,
    'data-testid': dataTestId,
    ...buttonProps
  } = props;

  const classNameMods = {
    [cls.square]: square,
    [cls.rounded]: rounded,
    [cls.disabled]: disabled,
    [cls.fullWidth]: props.fullWidth,
  };

  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? 'button'}
      data-testid={`${dataTestId}.Button`}
      className={classNames(cls.Button, classNameMods, [
        props.className,
        cls[mapButtonThemeClasses[theme]],
        cls[mapButtonSizeClasses[size]],
      ])}
    >
      {children}
    </button>
  );
});
