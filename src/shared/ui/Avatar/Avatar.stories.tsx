import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import StoryAvatar from './storyAvatar.jpeg';

export default {
  title: 'shared/Avatar',
  component: Avatar,
} as Meta<ComponentProps<typeof Avatar>>;

type AvatarStory = StoryObj<typeof Avatar>;

export const Default: AvatarStory = {
  args: {
    src: StoryAvatar,
  },
};

export const Small: AvatarStory = {
  args: {
    src: StoryAvatar,
    size: 50,
  },
};

export const Big: AvatarStory = {
  args: {
    src: StoryAvatar,
    size: 150,
  },
};
