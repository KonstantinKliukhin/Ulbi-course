import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleSortSelector } from './ArticleSortSelector';
import { action } from '@storybook/addon-actions';
import { ArticleSortField } from '@/entities/Article';

export default {
  title: 'entities/Article/ArticleSortSelector',
  component: ArticleSortSelector,
} as Meta<ComponentProps<typeof ArticleSortSelector>>;

type ArticleSortSelectorStory = StoryObj<typeof ArticleSortSelector>;

export const Default: ArticleSortSelectorStory = {
  args: {
    sort: ArticleSortField.CREATED,
    order: 'asc',
    onChangeOrder: action('onChangeOrder'),
    onChangeSort: action('onChangeSort'),
  },
};
