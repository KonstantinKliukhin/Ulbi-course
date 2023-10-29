import { Theme, ThemeContext } from './ThemeContext';
import { useContext } from 'react';

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme, } = useContext(ThemeContext);
  const toggleTheme = (): void => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  return { toggleTheme, theme, };
};
