import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { AppLink, AppLinkTheme } from './AppLink';

export default {
  title: 'shared/AppLink',
  component: AppLink,
  args: { to: '/', },
} as Meta<ComponentProps<typeof AppLink>>;

type AppLinkStory = StoryObj<typeof AppLink>;

export const Primary: AppLinkStory = {
  args: { children: 'Link', theme: AppLinkTheme.PRIMARY, },
};

export const Secondary: AppLinkStory = {
  args: { children: 'Link', theme: AppLinkTheme.SECONDARY, },
};

export const Red: AppLinkStory = {
  args: { children: 'Link', theme: AppLinkTheme.RED, },
};
