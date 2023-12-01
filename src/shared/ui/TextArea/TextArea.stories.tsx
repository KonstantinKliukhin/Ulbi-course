import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';
import { action } from '@storybook/addon-actions';

export default {
  title: 'shared/TextArea',
  component: TextArea,
} as Meta<ComponentProps<typeof TextArea>>;

type TextAreaStory = StoryObj<typeof TextArea>;

export const Default: TextAreaStory = {
  args: {
    value: 'some value',
    placeholder: 'Placeholder',
    onChange: action('onChange'),
  },
};
