import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { loginReducer } from '../../model/slice/loginSlice';

export default {
  title: 'features/AuthByUsername/LoginForm',
  component: LoginForm,
} as Meta<ComponentProps<typeof LoginForm>>;

type LoginFormStory = StoryObj<typeof LoginForm>;

export const Primary: LoginFormStory = {};

export const Loading: LoginFormStory = {
  decorators: [StoreDecorator(
    {
      loginForm: {
        isLoading: true,
        error: null,
      },
    },
    { loginForm: loginReducer, }
  ),],
};

export const Error: LoginFormStory = {
  decorators: [StoreDecorator(
    {
      loginForm: {
        error: 'Some login error',
        isLoading: false,
      },
    },
    { loginForm: loginReducer, }
  ),],
};
