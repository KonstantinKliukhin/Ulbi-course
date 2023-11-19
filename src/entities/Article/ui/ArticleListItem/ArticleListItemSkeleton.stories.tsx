import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import { ArticleView } from '../../model/types/article';

export default {
  title: 'entities/Article/ArticleListItemSkeleton',
  component: ArticleListItemSkeleton,
} as Meta<ComponentProps<typeof ArticleListItemSkeleton>>;

type ArticleListItemSkeletonStory = StoryObj<typeof ArticleListItemSkeleton>;

export const Big: ArticleListItemSkeletonStory = {
  args: {
    view: ArticleView.BIG,
  },
};

export const Small: ArticleListItemSkeletonStory = {
  args: {
    view: ArticleView.SMALL,
  },
};
