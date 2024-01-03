import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ArticleDetailsPage from './ArticleDetailsPage';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { mockedArticle, mockedArticles, mockedComments, mockedUser } from 'shared/mocks';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';
import { RoutePath } from 'shared/config';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { articleApi, articleCommentsApi } from 'entities/Article';
import { recommendationsApi } from 'features/ArticleRecomemndations/api/articleRecommendationsApi';

export default {
  title: 'pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
} as Meta<ComponentProps<typeof ArticleDetailsPage>>;

type ArticleDetailsPageStory = StoryObj<typeof ArticleDetailsPage>;

const routerParameters = {
  reactRouter: reactRouterParameters({
    location: {
      pathParams: { id: '1', },
    },
    routing: { path: RoutePath.articleDetails(':id'), },
  }),
};

export const Default: ArticleDetailsPageStory = {
  args: {},
  parameters: routerParameters,
  decorators: [
    StoreDecorator(
      {
        api: {
          queries: {
            [`${articleApi.endpoints.getArticleById.name}({"id":"1"})`]: {
              status: QueryStatus.fulfilled,
              data: mockedArticle,
            },
            [`${articleCommentsApi.endpoints.getArticleComments.name}({"articleId":"1"})`]: {
              status: QueryStatus.fulfilled,
              data: mockedComments,
            },
            [`${recommendationsApi.endpoints.getArticleRecommendations.name}({"limit":4})`]: {
              status: QueryStatus.fulfilled,
              data: mockedArticles.slice(0, 4),
            },
          },
        },
      }
    ),
  ],
};

export const CanEdit: ArticleDetailsPageStory = {
  args: {},
  parameters: routerParameters,
  decorators: [
    StoreDecorator(
      {
        user: {
          authData: mockedUser,
        },
        api: {
          queries: {
            'getArticleById({"id":"1"})': {
              status: QueryStatus.fulfilled,
              data: mockedArticle,
            },
            'getArticleComments({"articleId":"1"})': {
              status: QueryStatus.fulfilled,
              data: mockedComments,
            },
            'getArticleRecommendations({"limit":4})': {
              status: QueryStatus.fulfilled,
              data: mockedArticles.slice(0, 4),
            },
          },
        },
      }
    ),
  ],
};

export const Loading: ArticleDetailsPageStory = {
  args: {},
  parameters: routerParameters,
  decorators: [
    StoreDecorator(
      {
        api: {
          queries: {
            'getArticleById({"id":"1"})': {
              status: QueryStatus.pending,
            },
            'getArticleComments({"articleId":"1"})': {
              status: QueryStatus.pending,
            },
            'getArticleRecommendations({"limit":4})': {
              status: QueryStatus.pending,
            },
          },
        },
      }
    ),
  ],
};

export const Error: ArticleDetailsPageStory = {
  args: {},
  parameters: routerParameters,
  decorators: [
    StoreDecorator(
      {
        api: {
          queries: {
            'getArticleById({"id":"1"})': {
              status: QueryStatus.rejected,
              error: { message: 'Some Api Error', },
            },
            'getArticleComments({"articleId":"1"})': {
              status: QueryStatus.rejected,
              error: { message: 'Some Api Error', },
            },
            'getArticleRecommendations({"limit":4})': {
              status: QueryStatus.rejected,
              error: { message: 'Some Api Error', },
            },
          },
        },
      }
    ),
  ],
};
