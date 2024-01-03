import { createContext, type Dispatch, type SetStateAction } from 'react';

export enum Theme {
  LIGHT = 'light_theme',
  DARK = 'dark_theme',
  PURPLE = 'purple_theme'
}

export interface ThemeContextProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.LIGHT, setTheme: () => undefined,
});
