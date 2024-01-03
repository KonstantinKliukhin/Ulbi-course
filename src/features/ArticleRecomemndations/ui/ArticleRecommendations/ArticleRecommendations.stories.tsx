import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleRecommendations } from './ArticleRecommendations';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { mockedArticles } from 'shared/mocks';

export default {
  title: 'features/ArticleRecommendations',
  component: ArticleRecommendations,
} as Meta<ComponentProps<typeof ArticleRecommendations>>;

type ArticleRecommendationsStory = StoryObj<typeof ArticleRecommendations>;

export const Default: ArticleRecommendationsStory = {
  args: {},
  decorators: [StoreDecorator({
    api: {
      queries: {
        'getArticleRecommendations({"limit":4})': {
          status: QueryStatus.fulfilled,
          data: mockedArticles.slice(0, 4),
        },
      },
    },
  }),],
};
