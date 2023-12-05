import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
} as Meta<ComponentProps<typeof Button>>;

type ButtonStory = StoryObj<typeof Button>;

export const Clear: ButtonStory = {
  args: { theme: 'clear', children: 'Button', },
};

export const ClearInverted: ButtonStory = {
  args: { theme: 'clearInverted', children: 'Button', },
};

export const Background: ButtonStory = {
  args: { theme: 'background', children: 'Button', },
};

export const BackgroundInverted: ButtonStory = {
  args: { theme: 'backgroundInverted', children: 'Button', },
};

export const Outline: ButtonStory = {
  args: { theme: 'outline', children: 'Button', },
};

export const Square: ButtonStory = {
  args: { theme: 'backgroundInverted', children: '>', square: true, },
};

export const Round: ButtonStory = {
  args: {
    theme: 'backgroundInverted',
    rounded: true,
    children: '>',
    square: true,
    size: 'xl',
  },
};

export const SizeM: ButtonStory = {
  args: { children: 'Button', size: 'm', },
};

export const SizeL: ButtonStory = {
  args: { children: 'Button', size: 'l', },
};

export const SizeXL: ButtonStory = {
  args: { children: 'Button', size: 'xl', },
};
