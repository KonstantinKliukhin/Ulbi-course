import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

export default {
  title: 'features/LoginForm',
  component: LoginForm,
} as Meta<ComponentProps<typeof LoginForm>>;

type LoginFormStory = StoryObj<typeof LoginForm>;

export const Primary: LoginFormStory = {};
