import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleDetails } from './ArticleDetails';
import { mockedArticle } from 'shared/mocks';

export default {
  title: 'entities/Article/ArticleDetails',
  component: ArticleDetails,
} as Meta<ComponentProps<typeof ArticleDetails>>;

type ArticleDetailsStory = StoryObj<typeof ArticleDetails>;

export const Default: ArticleDetailsStory = {
  args: {
    article: mockedArticle,
    isLoading: false,
  },
};

export const Loading: ArticleDetailsStory = {
  args: {
    isLoading: true,
  },
};

export const Error: ArticleDetailsStory = {
  args: {
    error: 'Some api Error',
  },
};
