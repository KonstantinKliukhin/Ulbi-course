import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleList } from './ArticleList';
import { mockedArticles } from 'shared/mocks';

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
} as Meta<ComponentProps<typeof ArticleList>>;

type ArticleListStory = StoryObj<typeof ArticleList>;

export const Default: ArticleListStory = {
  args: {
    articles: mockedArticles,
  },
};

export const Skeleton = {
  args: {
    isLoading: true,
  },
};
