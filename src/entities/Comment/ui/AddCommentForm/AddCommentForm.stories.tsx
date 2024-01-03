import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { AddCommentForm } from './AddCommentForm';

export default {
  title: 'entities/Comment/AddCommentForm',
  component: AddCommentForm,
} as Meta<ComponentProps<typeof AddCommentForm>>;

type AddCommentFormStory = StoryObj<typeof AddCommentForm>;

export const Default: AddCommentFormStory = {
  args: {
    isLoading: false,
    error: null,
    isValid: true,
  },
};

export const Invalid: AddCommentFormStory = {
  args: {
    isLoading: false,
    error: null,
    isValid: false,
  },
};

export const Loading: AddCommentFormStory = {
  args: {
    isLoading: true,
    error: null,
  },
};

export const Error: AddCommentFormStory = {
  args: {
    isLoading: false,
    error: 'Some Api Error',
  },
};
