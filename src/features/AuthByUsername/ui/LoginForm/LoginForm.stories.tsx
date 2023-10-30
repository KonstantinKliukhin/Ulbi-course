import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';

export default {
  title: 'features/LoginForm',
  component: LoginForm,
} as Meta<ComponentProps<typeof LoginForm>>;

type LoginFormStory = StoryObj<typeof LoginForm>;

export const Primary: LoginFormStory = {};

export const Error: LoginFormStory = {
  decorators: [StoreDecorator({
    loginForm: {
      username: 'Invalid name',
      password: 'Invalid password',
      error: 'Some login error',
      isLoading: false,
    },
  }),],
};

export const Loading: LoginFormStory = {
  decorators: [StoreDecorator({
    loginForm: {
      username: 'Invalid name',
      password: 'Invalid password',
      isLoading: true,
      error: null,
    },
  }),],
};
