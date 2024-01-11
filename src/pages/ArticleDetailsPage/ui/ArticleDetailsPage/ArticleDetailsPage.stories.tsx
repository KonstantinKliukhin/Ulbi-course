import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ArticleDetailsPage from './ArticleDetailsPage';
import { StoreDecorator } from '@/shared/config/storybook/storeDecorator/storeDecorator';
import { mockedArticle, mockedArticles, mockedComments, mockedUser } from '@/shared/mocks';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';
import { RoutePath } from '@/shared/config';
import { API_ROUTES } from '@/shared/api';

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

const successMockDataParameters = [
  {
    url: `${API_ROUTES.articles()}?_limit=4`,
    method: 'GET',
    status: 200,
    response: mockedArticles,
  },
  {
    url: `${API_ROUTES.comments()}?articleId=${mockedArticle.id}&_expand=user`,
    method: 'GET',
    status: 200,
    response: mockedComments,
  },
  {
    url: `${API_ROUTES.articles('1')}?_expand=user`,
    method: 'GET',
    status: 200,
    response: mockedArticle,
  },
  {
    url: API_ROUTES.articleRating(),
    method: 'POST',
    status: 200,
  },
];

export const Default: ArticleDetailsPageStory = {
  args: {},
  parameters: {
    ...routerParameters,
    mockData: successMockDataParameters,
  },
};

export const CanEdit: ArticleDetailsPageStory = {
  args: {},
  parameters: {
    ...routerParameters,
    mockData: successMockDataParameters,
  },
  decorators: [
    StoreDecorator({
      user: {
        authData: mockedUser,
      },
    }),
  ],
};

export const Loading: ArticleDetailsPageStory = {
  args: {},
  parameters: {
    ...routerParameters,
    mockData: successMockDataParameters.map(data => ({ ...data, delay: 9999999999, })),
  },
};

export const Error: ArticleDetailsPageStory = {
  args: {},
  parameters: {
    ...routerParameters,
    mockData: successMockDataParameters.map(data => ({
      ...data,
      status: 500,
      response: { message: 'Some api Error', },
    })),
  },
};
