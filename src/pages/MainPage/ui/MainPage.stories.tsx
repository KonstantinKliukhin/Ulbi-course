import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import MainPage from './MainPage';

export default {
  title: 'pages/MainPage',
  component: MainPage,
} as Meta<ComponentProps<typeof MainPage>>;

type MainPageStory = StoryObj<typeof MainPage>;

export const Template: MainPageStory = {};
