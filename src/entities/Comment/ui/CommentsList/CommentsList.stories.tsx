import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { CommentsList } from './CommentsList';
import { mockedComments } from 'shared/mocks';

export default {
  title: 'entities/Comment/CommentsList',
  component: CommentsList,
} as Meta<ComponentProps<typeof CommentsList>>;

type CommentsListStory = StoryObj<typeof CommentsList>;

export const Default: CommentsListStory = {
  args: {
    comments: mockedComments,
  },
};

export const Loading: CommentsListStory = {
  args: {
    isLoading: true,
  },
};

export const Error: CommentsListStory = {
  args: {
    error: 'Some api error',
  },
};
