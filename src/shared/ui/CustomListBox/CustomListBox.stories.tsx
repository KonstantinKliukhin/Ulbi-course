import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { CustomListBox } from './CustomListBox';
import { action } from '@storybook/addon-actions';

export default {
  title: 'shared/CustomListBox',
  component: CustomListBox,
} as Meta<ComponentProps<typeof CustomListBox>>;

type CustomListBoxStory = StoryObj<typeof CustomListBox>;

export const Default: CustomListBoxStory = {
  args: {
    value: '1',
    options: [
      { value: '1', content: 'first', },
      { value: '2', content: 'second', },
      { value: '3', content: 'third', },
    ],
    onChange: action('onChange'),
  },
};

export const FormVariant: CustomListBoxStory = {
  args: {
    value: '1',
    label: 'Some Label',
    options: [
      { value: '1', content: 'first', },
      { value: '2', content: 'second', },
      { value: '3', content: 'third', },
    ],
    onChange: action('onChange'),
    error: 'Some Validation Error',
  },
};
