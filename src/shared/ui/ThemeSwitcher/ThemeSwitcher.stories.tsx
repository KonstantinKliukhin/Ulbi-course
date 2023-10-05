import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
  title: 'shared/ThemeSwitcher',
  component: ThemeSwitcher,
} as Meta<ComponentProps<typeof ThemeSwitcher>>;

type ThemeSwitcherStory = StoryObj<typeof ThemeSwitcher>;

export const Light: ThemeSwitcherStory = {};
