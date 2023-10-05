import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Button, ThemeButton } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
} as Meta<ComponentProps<typeof Button>>;

type ButtonStory = StoryObj<typeof Button>;

export const Clear: ButtonStory = {
  args: { theme: ThemeButton.CLEAR, children: 'Button', },
};

export const Native: ButtonStory = {
  args: { theme: ThemeButton.NATIVE, children: 'Button', },
};

export const Outline: ButtonStory = {
  args: { theme: ThemeButton.OUTLINE, children: 'Button', },
};
