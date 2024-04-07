import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleListItem } from './ArticleListItem';
import { mockedArticle } from '@/shared/mocks';
import { ArticleView } from '../../constants/articleView';

export default {
  title: 'entities/Article/ArticleListItem',
  component: ArticleListItem,
} as Meta<ComponentProps<typeof ArticleListItem>>;

type ArticleListItemStory = StoryObj<typeof ArticleListItem>;

export const Big: ArticleListItemStory = {
  args: {
    view: ArticleView.BIG,
    article: mockedArticle,
  },
};

export const Small: ArticleListItemStory = {
  args: {
    view: ArticleView.SMALL,
    article: mockedArticle,
  },
};
