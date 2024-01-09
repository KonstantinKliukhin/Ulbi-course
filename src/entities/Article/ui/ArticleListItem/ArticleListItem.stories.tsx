import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleListItem } from './ArticleListItem';
import { ArticleView } from '../../model/types/article';
import { mockedArticle } from '@/shared/mocks';

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
