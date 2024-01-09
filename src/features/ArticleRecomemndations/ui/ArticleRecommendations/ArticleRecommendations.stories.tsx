import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleRecommendations } from './ArticleRecommendations';
import { mockedArticles } from '@/shared/mocks';
import { API_ROUTES } from '@/shared/api';

export default {
  title: 'features/ArticleRecommendations/ArticleRecommendations',
  component: ArticleRecommendations,
} as Meta<ComponentProps<typeof ArticleRecommendations>>;

type ArticleRecommendationsStory = StoryObj<typeof ArticleRecommendations>;

const successMockDataParameters = [
  {
    url: `${API_ROUTES.articles()}?_limit=4`,
    method: 'GET',
    status: 200,
    response: mockedArticles,
  },
];

export const Default: ArticleRecommendationsStory = {
  args: {},
  parameters: {
    mockData: successMockDataParameters,
  },
  decorators: [],
};

export const Loading: ArticleRecommendationsStory = {
  args: {},
  parameters: {
    mockData: successMockDataParameters.map(data => ({ ...data, delay: 9999999999, })),
  },
  decorators: [],
};

export const NotFound: ArticleRecommendationsStory = {
  args: {},
  parameters: {
    mockData: successMockDataParameters.map(data => ({ ...data, response: [], })),
  },
  decorators: [],
};
