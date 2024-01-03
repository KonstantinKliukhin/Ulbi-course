import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { PageError } from './PageError';

export default {
  title: 'widgets/PageError',
  component: PageError,
} as Meta<ComponentProps<typeof PageError>>;

type PageErrorStory = StoryObj<typeof PageError>;

export const Template: PageErrorStory = {};
