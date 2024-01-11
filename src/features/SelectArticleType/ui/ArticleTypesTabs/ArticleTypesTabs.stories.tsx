import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleTypesTabs } from './ArticleTypesTabs';
import { action } from '@storybook/addon-actions';
import { ArticleType } from '@/entities/Article';

export default {
  title: 'features/SelectArticleType/ArticleTypesTabs',
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
  },
};

export const Multiple: ArticleTypesTabsStory = {
  args: {
    label: 'Some Label',
    value: [ArticleType.SCIENCE, ArticleType.IT,],
    onSelectType: action('onSelectType'),
    error: 'Some Api Error',
  },
};
