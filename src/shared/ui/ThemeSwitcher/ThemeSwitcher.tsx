import { memo, type ReactNode } from 'react';
import cls from './ThemeSwitcher.module.scss';
import { classNames } from 'shared/lib';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonSize, ButtonTheme } from '../Button/Button';
import MoonIcon from '../../../../public/assets/icons/moon.svg';
import SunIcon from '../../../../public/assets/icons/sun.svg';

interface ThemeSwitcherProps {
  className?: string
}

interface ThemeSwitcherContent {
  icon: ReactNode
  className?: string
}

const THEME_CONTENT_MAP: Record<Theme, ThemeSwitcherContent> = {
  [Theme.LIGHT]: {
    icon: <SunIcon className={classNames(cls.icon, {}, [cls.sun,])}/>,
  },
  [Theme.DARK]: {
    icon: <MoonIcon className={classNames(cls.icon, {}, [cls.moon,])}/>,
  },
  [Theme.PURPLE]: {
    icon: <div className={classNames(cls.icon, {}, [cls.purple,])}/>,
  },
};

export const ThemeSwitcher = memo<ThemeSwitcherProps>(function ThemeSwitcher (props) {
  const { theme, toggleTheme, } = useTheme();

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      rounded
      square
      size={ButtonSize.L}
      className={classNames(cls.ThemeSwitcher, {}, [props.className,])}
      onClick={toggleTheme}
    >
      {THEME_CONTENT_MAP[theme].icon}
    </Button>
  );
});
