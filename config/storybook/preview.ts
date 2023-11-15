import type { Preview } from '@storybook/react';
import { StyleDecorator } from 'shared/config/storybook/styleDecorator/styleDecorator';
import { ThemeDecorator } from 'shared/config/storybook/themeDecorator/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { RouterDecorator } from 'shared/config/storybook/routerDecorator/routerDecorator';
import { I18nDecorator } from 'shared/config/storybook/i18nDecorator/i18nDecorator';
import { GlobalStoreDecorator } from 'shared/config/storybook/globalStoreDecorator/globalStoreDecorator';
import {
  OptionalDecoratorsProvider
} from 'shared/config/storybook/OptionalDecoratorsDecorator/OptionalDecoratorsProvider';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*', },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    I18nDecorator,
    StyleDecorator,
    ThemeDecorator(Theme.LIGHT),
    GlobalStoreDecorator,
    RouterDecorator,
    OptionalDecoratorsProvider,
  ],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English', },
          { value: 'uk', right: '🇺🇦', title: 'Ukrainian', },
        ],
        showName: true,
      },
    },
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: Theme.LIGHT,
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: Theme.LIGHT, title: 'light', },
          { value: Theme.DARK, title: 'dark', },
          { value: Theme.PURPLE, title: 'purple', },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
