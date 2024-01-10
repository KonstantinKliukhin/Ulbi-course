import { memo, type ReactNode } from 'react';
import cls from './ThemeSwitcher.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { Button } from '../Button/Button';
import { MoonIcon, SunIcon } from '@/shared/assets';
import { Icon } from '../Icon/Icon';

interface ThemeSwitcherProps {
  className?: string;
}

interface ThemeSwitcherContent {
  icon: ReactNode;
  className?: string;
}

const THEME_CONTENT_MAP: Record<Theme, ThemeSwitcherContent> = {
  [Theme.LIGHT]: {
    icon: <SunIcon className={classNames(cls.icon, {}, [cls.sun,])} />,
  },
  [Theme.DARK]: {
    icon: <Icon Svg={MoonIcon} className={classNames(cls.icon, {}, [cls.moon,])} />,
  },
  [Theme.PURPLE]: {
    icon: <div className={classNames(cls.icon, {}, [cls.purple,])} />,
  },
};

export const ThemeSwitcher = memo<ThemeSwitcherProps>(function ThemeSwitcher (
  props
) {
  const { theme, toggleTheme, } = useTheme();

  return (
    <Button
      theme="clear"
      rounded
      square
      size="l"
      className={classNames(cls.ThemeSwitcher, {}, [props.className,])}
      onClick={toggleTheme}
    >
      {THEME_CONTENT_MAP[theme].icon}
    </Button>
  );
});
