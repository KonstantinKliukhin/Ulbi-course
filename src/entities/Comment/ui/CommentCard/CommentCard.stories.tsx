import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { mockedComment } from '@/shared/mocks';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
} as Meta<ComponentProps<typeof CommentCard>>;

type CommentCardStory = StoryObj<typeof CommentCard>;

export const Default: CommentCardStory = {
  args: {
    comment: mockedComment,
  },
};

export const Loading: CommentCardStory = {
  args: {
    isLoading: true,
  },
};
