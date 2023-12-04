import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleTypesTabs } from './ArticleTypesTabs';
import { ArticleType } from '../../model/types/article';
import { action } from '@storybook/addon-actions';

export default {
  title: 'entities/Article/ArticleTypesTabs',
  component: ArticleTypesTabs,
} as Meta<ComponentProps<typeof ArticleTypesTabs>>;

type ArticleTypesTabsStory = StoryObj<typeof ArticleTypesTabs>;

export const Default: ArticleTypesTabsStory = {
  args: {
    value: ArticleType.SCIENCE,
    onSelectType: action('onSelectType'),
  },
};

export const WithLabel: ArticleTypesTabsStory = {
  args: {
    label: 'Some Label',
    value: ArticleType.SCIENCE,
    onSelectType: action('onSelectType'),
  },
};

export const WithError: ArticleTypesTabsStory = {
  args: {
    label: 'Some Label',
    value: ArticleType.SCIENCE,
    onSelectType: action('onSelectType'),
    error: 'Some Api Error',
    withError: true,
  },
};

export const Multiple: ArticleTypesTabsStory = {
  args: {
    label: 'Some Label',
    value: [ArticleType.SCIENCE, ArticleType.IT,],
    onSelectType: action('onSelectType'),
    error: 'Some Api Error',
    withError: true,
  },
};
