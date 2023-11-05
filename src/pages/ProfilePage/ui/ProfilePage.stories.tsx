import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
} as Meta<ComponentProps<typeof ProfilePage>>;

type ProfilePageStory = StoryObj<typeof ProfilePage>;

export const Primary: ProfilePageStory = {
  args: {},
};
