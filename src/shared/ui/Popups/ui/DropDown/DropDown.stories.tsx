import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { DropDown } from './DropDown';
import { Button } from '../../../Button/Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'shared/Popups/DropDown',
  component: DropDown,
} as Meta<ComponentProps<typeof DropDown>>;

type DropDownStory = StoryObj<typeof DropDown>;

export const Default: DropDownStory = {
  args: {
    buttonContent: <Button theme="outline">Click</Button>,
    items: [
      {
        content: 'First item',
        onClick: action('first item: onClick'),
      },
      {
        content: 'Second item',
        onClick: action('second item: onClick'),
      },
      {
        content: 'Third item',
        onClick: action('third item: onClick'),
      },
      {
        content: 'Forth item',
        onClick: action('forth item: onClick'),
      },
    ],
  },
};

export const WithDisabledItem: DropDownStory = {
  args: {
    buttonContent: <Button theme="outline">Click</Button>,
    items: [
      {
        content: 'First item',
        onClick: action('first item: onClick'),
      },
      {
        content: 'Second item',
        onClick: action('second item: onClick'),
      },
      {
        content: 'Third item',
        onClick: action('third item: onClick'),
        disable: true,
      },
      {
        content: 'Forth item',
        onClick: action('forth item: onClick'),
      },
    ],
  },
};

export const WithLinkItem: DropDownStory = {
  args: {
    buttonContent: <Button theme="outline">Click</Button>,
    items: [
      {
        content: 'First item',
        link: '/',
      },
      {
        content: 'Second item',
        onClick: action('second item: onClick'),
      },
      {
        content: 'Third item',
        onClick: action('third item: onClick'),
        disable: true,
      },
      {
        content: 'Forth item',
        onClick: action('forth item: onClick'),
      },
    ],
  },
};
