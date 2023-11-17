import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import AboutPage from './AboutPage';

export default {
  title: 'pages/AboutPage',
  component: AboutPage,
} as Meta<ComponentProps<typeof AboutPage>>;

type AboutPageStory = StoryObj<typeof AboutPage>;

export const Template: AboutPageStory = {};
