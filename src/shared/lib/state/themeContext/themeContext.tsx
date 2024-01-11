import { Theme } from '../../../constants/theme';
import { createContext, type Dispatch, type SetStateAction } from 'react';

export interface ThemeContextProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.LIGHT, setTheme: () => undefined,
});
