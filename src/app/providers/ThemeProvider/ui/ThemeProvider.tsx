import { type FC, type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, type Theme } from '@/shared/constants';
import { ThemeContext } from '@/shared/lib';
import { getStorageTheme } from '../model/getStorageTheme/getStorageTheme';

const defaultTheme = getStorageTheme();

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
