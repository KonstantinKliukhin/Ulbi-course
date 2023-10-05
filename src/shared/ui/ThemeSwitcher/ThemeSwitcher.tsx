import { type FC, type ReactNode } from 'react';
import cls from './ThemeSwitcher.module.scss';
import { classNames } from 'shared/lib';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Button } from 'shared/ui';
import { ThemeButton } from 'shared/ui/Button/Button';
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
};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = props => {
  const { theme, toggleTheme, } = useTheme();

  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [props.className,])}
      onClick={toggleTheme}
        >
      {THEME_CONTENT_MAP[theme].icon}
    </Button>
  );
};
