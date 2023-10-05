import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

export default {
  title: 'widget/Navbar',
  component: Navbar,
} as Meta<ComponentProps<typeof Navbar>>;

type NavbarStory = StoryObj<typeof Navbar>;

export const Template: NavbarStory = {};
