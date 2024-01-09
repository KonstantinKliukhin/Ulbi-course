import { type FC, useEffect } from 'react';
import { type Theme } from '@/app/providers/ThemeProvider';

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (defaultTheme: Theme) => (Story: FC, context: any) => {
  const { theme: storybookSelectedTheme, } = context.globals;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.className = storybookSelectedTheme || defaultTheme;
  }, [storybookSelectedTheme,]);

  return (
    <div className='app'>
      <Story/>
    </div>
  );
};
