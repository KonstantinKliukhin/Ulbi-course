import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { AppLink } from './AppLink';

export default {
  title: 'shared/AppLink',
  component: AppLink,
  args: { to: '/', },
} as Meta<ComponentProps<typeof AppLink>>;

type AppLinkStory = StoryObj<typeof AppLink>;

export const Clear: AppLinkStory = {
  args: { children: 'Link', theme: 'clear', },
};

export const Primary: AppLinkStory = {
  args: { children: 'Link', theme: 'primary', },
};

export const Secondary: AppLinkStory = {
  args: { children: 'Link', theme: 'secondary', },
};

export const Red: AppLinkStory = {
  args: { children: 'Link', theme: 'red', },
};
