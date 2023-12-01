import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { action } from '@storybook/addon-actions';

export default {
  title: 'shared/Tabs',
  component: Tabs,
} as Meta<ComponentProps<typeof Tabs>>;

type TabsStory = StoryObj<typeof Tabs>;

export const Default: TabsStory = {
  args: {
    tabs: [
      {
        value: '1',
        content: 'First Tab',
      },
      {
        value: '2',
        content: 'Second Tab',
      },
      {
        value: '3',
        content: 'Third Tab',
      },
      {
        value: '4',
        content: 'Forth Tab',
      },
    ],
    value: '1',
    onTabClick: action('onTabClick'),
  },
};

export const WithDisabled: TabsStory = {
  args: {
    tabs: [
      {
        value: '1',
        content: 'First Tab',
      },
      {
        value: '2',
        content: 'Second Tab',
        disabled: true,
      },
      {
        value: '3',
        content: 'Third Tab',
        disabled: true,
      },
      {
        value: '4',
        content: 'Forth Tab',
      },
    ],
    value: '1',
    onTabClick: action('onTabClick'),
  },
};

export const WithLabel: TabsStory = {
  args: {
    tabs: [
      {
        value: '1',
        content: 'First Tab',
      },
      {
        value: '2',
        content: 'Second Tab',
        disabled: true,
      },
      {
        value: '3',
        content: 'Third Tab',
        disabled: true,
      },
      {
        value: '4',
        content: 'Forth Tab',
      },
    ],
    value: '1',
    label: 'Some label',
    onTabClick: action('onTabClick'),
  },
};

export const WithError: TabsStory = {
  args: {
    tabs: [
      {
        value: '1',
        content: 'First Tab',
      },
      {
        value: '2',
        content: 'Second Tab',
        disabled: true,
      },
      {
        value: '3',
        content: 'Third Tab',
        disabled: true,
      },
      {
        value: '4',
        content: 'Forth Tab',
      },
    ],
    value: '1',
    label: 'Some label',
    withError: true,
    error: 'Some Api Error',
    onTabClick: action('onTabClick'),
  },
};
