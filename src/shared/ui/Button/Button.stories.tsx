import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonTheme } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
} as Meta<ComponentProps<typeof Button>>;

type ButtonStory = StoryObj<typeof Button>;

export const Clear: ButtonStory = {
  args: { theme: ButtonTheme.CLEAR, children: 'Button', },
};

export const ClearInverted: ButtonStory = {
  args: { theme: ButtonTheme.CLEAR_INVERTED, children: 'Button', },
};

export const Background: ButtonStory = {
  args: { theme: ButtonTheme.BACKGROUND, children: 'Button', },
};

export const BackgroundInverted: ButtonStory = {
  args: { theme: ButtonTheme.BACKGROUND_INVERTED, children: 'Button', },
};

export const Outline: ButtonStory = {
  args: { theme: ButtonTheme.OUTLINE, children: 'Button', },
};

export const Square: ButtonStory = {
  args: { theme: ButtonTheme.BACKGROUND_INVERTED, children: '>', square: true, },
};

export const Round: ButtonStory = {
  args: { theme: ButtonTheme.BACKGROUND_INVERTED, rounded: true, children: '>', square: true, size: ButtonSize.XL, },
};
