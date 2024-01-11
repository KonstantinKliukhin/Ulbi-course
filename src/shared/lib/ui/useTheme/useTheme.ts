import { useContext } from 'react';
import { Theme } from '../../../constants/theme';
import { ThemeContext } from '../../state/themeContext/themeContext';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme, } = useContext(ThemeContext);

  const toggleTheme = (): void => {
    setTheme((prevTheme): Theme => {
      switch (prevTheme) {
        case Theme.LIGHT:
          return Theme.DARK;
        case Theme.DARK:
          return Theme.PURPLE;
        case Theme.PURPLE:
          return Theme.LIGHT;
        default:
          return Theme.LIGHT;
      }
    });
  };

  return { toggleTheme, theme, };
};
