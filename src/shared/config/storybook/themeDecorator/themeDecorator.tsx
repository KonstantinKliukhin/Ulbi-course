import { type FC, type PropsWithChildren, useContext, useEffect } from 'react';
import type { Theme } from '../../../constants/theme';
import { ThemeContext } from '../../../lib/state/themeContext/themeContext';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

interface ThemeDecoratorWrapperProps extends PropsWithChildren {
  context: Record<string, any>;
  defaultTheme: Theme;
}
const ThemeDecoratorWrapper: FC<ThemeDecoratorWrapperProps> = (props) => {
  const { theme: storybookSelectedTheme, } = props.context.globals;
  const { setTheme, } = useContext(ThemeContext);

  useEffect(() => {
    setTheme(storybookSelectedTheme || props.defaultTheme);
    // eslint-disable-next-line
  }, [storybookSelectedTheme,]);

  return (
    <div className='app'>
      {props.children}
    </div>
  );
};

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (defaultTheme: Theme) => (Story: FC, context: any) => {
  return (
    <ThemeProvider>
      <div className='app'>
        <ThemeDecoratorWrapper context={context} defaultTheme={defaultTheme}>
          <Story/>
        </ThemeDecoratorWrapper>
      </div>
    </ThemeProvider>
  );
};
