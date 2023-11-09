import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Select } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
} as Meta<ComponentProps<typeof Select>>;

type SelectStory = StoryObj<typeof Select>;

export const Primary: SelectStory = {
  args: {
    label: 'Some label',
    options: [
      { value: '1', content: 'content 1', },
      { value: '2', content: 'content 2', },
      { value: '3', content: 'content 3', },
      { value: '4', content: 'content 4', },
    ],
  },
};
