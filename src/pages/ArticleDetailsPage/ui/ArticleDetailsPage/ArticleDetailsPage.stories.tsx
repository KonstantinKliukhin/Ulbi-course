import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ArticleDetailsPage from './ArticleDetailsPage';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { articleCommentsReducer } from '../../model/slices/articleCommentsSlice';
import { mockedArticle, mockedComments, mockedUser } from 'shared/mocks';
import { articleDetailsReducer } from 'entities/Article/model/slices/articleDetailsSlice';
import { type Comment } from 'entities/Comment';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';
import { RoutePath } from 'shared/config';

export default {
  title: 'pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
} as Meta<ComponentProps<typeof ArticleDetailsPage>>;

type ArticleDetailsPageStory = StoryObj<typeof ArticleDetailsPage>;

const commentsEntities = mockedComments.reduce<Record<string, Comment>>(
  (acc, comment) => ({
    ...acc,
    [comment.id]: comment,
  }),
  {}
);
const commentsIds = mockedComments.map((comment) => comment.id);

const parameters = {
  reactRouter: reactRouterParameters({
    location: {
      pathParams: { id: '1', },
    },
    routing: { path: RoutePath.articleDetails(':id'), },
  }),
};

export const Default: ArticleDetailsPageStory = {
  args: {},
  parameters,
  decorators: [
    StoreDecorator(
      {
        articleDetails: {
          data: mockedArticle,
        },
        articleComments: {
          entities: commentsEntities,
          ids: commentsIds,
        },
      },
      {
        articleComments: articleCommentsReducer,
        articleDetails: articleDetailsReducer,
      }
    ),
  ],
};

export const CanEdit: ArticleDetailsPageStory = {
  args: {},
  parameters,
  decorators: [
    StoreDecorator(
      {
        user: {
          authData: mockedUser,
        },
        articleDetails: {
          data: mockedArticle,
        },
        articleComments: {
          entities: commentsEntities,
          ids: commentsIds,
        },
      },
      {
        articleComments: articleCommentsReducer,
        articleDetails: articleDetailsReducer,
      }
    ),
  ],
};

export const Loading: ArticleDetailsPageStory = {
  args: {},
  parameters,
  decorators: [
    StoreDecorator(
      {
        articleDetails: {
          isLoading: true,
        },
        articleComments: {
          isLoading: true,
          entities: commentsEntities,
          ids: commentsIds,
        },
      },
      {
        articleComments: articleCommentsReducer,
        articleDetails: articleDetailsReducer,
      }
    ),
  ],
};

export const Error: ArticleDetailsPageStory = {
  args: {},
  parameters,
  decorators: [
    StoreDecorator(
      {
        articleDetails: {
          error: 'Some Api Error',
        },
        articleComments: {
          entities: commentsEntities,
          ids: commentsIds,
          error: 'Some Api Error',
        },
      },
      {
        articleComments: articleCommentsReducer,
        articleDetails: articleDetailsReducer,
      }
    ),
  ],
};
