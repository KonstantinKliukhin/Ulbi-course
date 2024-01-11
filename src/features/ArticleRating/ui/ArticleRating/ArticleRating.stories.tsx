import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ArticleRating from './ArticleRating';
import { API_ROUTES } from '@/shared/api';
import { mockedArticle, mockedArticleRatings, mockedUser } from '@/shared/mocks';
import { StoreDecorator } from '@/shared/config/storybook/storeDecorator/storeDecorator';

export default {
  title: 'features/ArticleRating/ArticleRating',
  component: ArticleRating,
} as Meta<ComponentProps<typeof ArticleRating>>;

type ArticleRatingStory = StoryObj<typeof ArticleRating>;

const getMockDataParameter = {
  url: `${API_ROUTES.articleRating()}?userId=${mockedUser.id}&articleId=${mockedArticle.id}`,
  method: 'GET',
  status: 200,
  response: mockedArticleRatings,
};

const postMockDataParameter = {
  url: API_ROUTES.articleRating(),
  method: 'POST',
  status: 200,
};

export const Default: ArticleRatingStory = {
  parameters: {
    mockData: [postMockDataParameter, { ...getMockDataParameter, response: [], },],
  },
  args: {
    articleId: mockedArticle.id,
  },
  decorators: [
    StoreDecorator({
      user: {
        authData: mockedUser,
      },
    }),
  ],
};

export const Loading: ArticleRatingStory = {
  parameters: {
    mockData: [{ ...getMockDataParameter, delay: 9999999, },],
  },
  args: {
    articleId: mockedArticle.id,
  },
  decorators: [StoreDecorator({
    user: {
      authData: mockedUser,
    },
  }),],
};

export const Rated: ArticleRatingStory = {
  parameters: {
    mockData: [postMockDataParameter, getMockDataParameter,],
  },
  args: {
    articleId: mockedArticle.id,
  },
  decorators: [StoreDecorator({
    user: {
      authData: mockedUser,
    },
  }),],
};
