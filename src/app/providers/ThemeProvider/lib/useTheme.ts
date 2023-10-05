import { Theme, ThemeContext } from './ThemeContext';
import { useContext, useMemo } from 'react';

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme, } = useContext(ThemeContext);
  const toggleTheme = (): void => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  return useMemo(() => ({ toggleTheme, theme, }), [theme,]);
};
