import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import AddCommentForm from './AddCommentForm';
import { action } from '@storybook/addon-actions';

export default {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
} as Meta<ComponentProps<typeof AddCommentForm>>;

type AddCommentFormStory = StoryObj<typeof AddCommentForm>;

export const Default: AddCommentFormStory = {
  args: {
    isLoading: false,
    error: null,
    onSendComment: action('onSendComment'),
  },
};

export const Loading: AddCommentFormStory = {
  args: {
    isLoading: true,
    error: null,
    onSendComment: action('onSendComment'),
  },
};

export const Error: AddCommentFormStory = {
  args: {
    isLoading: false,
    error: 'Some Api Error',
    onSendComment: action('onSendComment'),
  },
};
