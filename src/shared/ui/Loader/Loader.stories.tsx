import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Loader } from './Loader';

export default {
  title: 'shared/Loader',
  component: Loader,
} as Meta<ComponentProps<typeof Loader>>;

type LoaderStory = StoryObj<typeof Loader>;

export const Template: LoaderStory = {};
