import { LOCAL_STORAGE_THEME_KEY, Theme } from '@/shared/constants';

const themes = Object.values(Theme);

const isTheme = (value: string): value is Theme => Object.values(themes).includes(value as Theme);

export const getStorageTheme = () => {
  const storageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

  if (storageTheme && isTheme(storageTheme)) {
    return storageTheme;
  } else {
    return Theme.LIGHT;
  }
};
