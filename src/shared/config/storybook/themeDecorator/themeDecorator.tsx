import { type FC, useEffect, useState } from 'react';
import { type Theme } from 'app/providers/ThemeProvider';

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (defaultTheme: Theme) => (Story: FC, context: any) => {
  const { theme: storybookSelectedTheme, } = context.globals;
  const [theme, setTheme,] = useState(defaultTheme);

  useEffect(() => {
    setTheme(storybookSelectedTheme);
  }, [storybookSelectedTheme,]);

  return (
    <div className={`app ${theme}`}>
      <Story/>
    </div>
  );
};
