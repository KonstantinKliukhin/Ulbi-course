import { Theme, ThemeContext } from '../lib/ThemeContext';
import { type FC, type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/constants';

const themes = Object.values(Theme);
const isTheme = (value: string): value is Theme => Object.values(themes).includes(value as Theme);
const getStorageTheme = () => {
  const storageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

  if (storageTheme && isTheme(storageTheme)) {
    return storageTheme;
  } else {
    return Theme.LIGHT;
  }
};
const defaultTheme = getStorageTheme() || Theme.LIGHT;

export const ThemeProvider: FC<PropsWithChildren> = props => {
  const [theme, setTheme,] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (!theme) return;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    document.body.className = theme;
  }, [theme,]);

  const themeProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme,]);

  return (
    <ThemeContext.Provider
      value={themeProps}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
