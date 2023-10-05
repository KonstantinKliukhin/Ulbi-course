import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { NotFoundPage } from './NotFoundPage';

export default {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
} as Meta<ComponentProps<typeof NotFoundPage>>;

type NotFoundPageStory = StoryObj<typeof NotFoundPage>;

export const Template: NotFoundPageStory = {};
