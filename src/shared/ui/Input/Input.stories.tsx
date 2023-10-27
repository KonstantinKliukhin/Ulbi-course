import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Input } from './Input';

export default {
  title: 'shared/Input',
  component: Input,
} as Meta<ComponentProps<typeof Input>>;

type InputStory = StoryObj<typeof Input>;

export const Primary: InputStory = {
  args: { placeholder: 'Placeholder', },
};

export const AutoFocus: InputStory = {
  args: { placeholder: 'Auto focus', autoFocus: true, },
};
