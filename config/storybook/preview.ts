import type { Preview } from '@storybook/react';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';
import {
  GlobalStoreDecorator,
  I18nDecorator,
  OptionalDecoratorsProvider,
  StyleDecorator,
  ThemeDecorator
} from '@/shared/config/storybook';
import { Theme } from '@/shared/constants';

const preview: Preview = {
  parameters: {
    reactRouter: reactRouterParameters({}),
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
    withRouter,
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
