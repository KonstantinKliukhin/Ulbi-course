import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { LoginModal } from './LoginModal';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { loginReducer } from '../../model/slice/loginSlice';
import { action } from '@storybook/addon-actions';

export default {
  title: 'features/AuthByUsername/LoginModal',
  component: LoginModal,
} as Meta<ComponentProps<typeof LoginModal>>;

type LoginModalStory = StoryObj<typeof LoginModal>;

export const Default: LoginModalStory = {
  args: {
    open: true,
    onClose: action('onClose'),
  },
  decorators: [StoreDecorator(
    {
      loginForm: {
        isLoading: false,
        error: null,
      },
    },
    { loginForm: loginReducer, }
  ),],
};
