import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { LanguageSwitcher } from './LanguageSwitcher';

export default {
  title: 'features/ChangeLanguage/LanguageSwitcher',
  component: LanguageSwitcher,
} as Meta<ComponentProps<typeof LanguageSwitcher>>;

type LanguageSwitcherStory = StoryObj<typeof LanguageSwitcher>;

export const Default: LanguageSwitcherStory = {};
