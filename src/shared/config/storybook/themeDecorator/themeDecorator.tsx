import { type FC, useEffect, useState } from 'react';
import { type Theme } from 'app/providers/ThemeProvider';

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (defaultTheme: Theme) => (Story: FC, context: any) => {
  const { theme: storybookSelectedTheme, } = context.globals;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [theme, setTheme,] = useState(defaultTheme);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setTheme(storybookSelectedTheme);
  }, [storybookSelectedTheme,]);

  return (
    <div className={`app ${theme}`}>
      <Story/>
    </div>
  );
};
