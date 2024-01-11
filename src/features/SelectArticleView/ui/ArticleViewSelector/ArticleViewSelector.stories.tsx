import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';
import { action } from '@storybook/addon-actions';
import { ArticleView } from '@/entities/Article';

export default {
  title: 'features/SelectArticleView/ArticleViewSelector',
  component: ArticleViewSelector,
} as Meta<ComponentProps<typeof ArticleViewSelector>>;

type ArticleViewSelectorStory = StoryObj<typeof ArticleViewSelector>;

export const Default: ArticleViewSelectorStory = {
  args: {
    onSelectView: action('onSelectView'),
    view: ArticleView.SMALL,
  },
};
