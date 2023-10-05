import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

export default {
  title: 'widget/Sidebar',
  component: Sidebar,
} as Meta<ComponentProps<typeof Sidebar>>;

type SidebarStory = StoryObj<typeof Sidebar>;

export const Template: SidebarStory = {};
