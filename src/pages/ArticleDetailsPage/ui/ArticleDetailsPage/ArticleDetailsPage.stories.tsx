import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ArticleDetailsPage from './ArticleDetailsPage';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { articleCommentsReducer } from '../../model/slices/articleCommentsSlice';
import { mockedArticle, mockedComments } from 'shared/mocks';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { type Comment } from 'entities/Comment';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';
import { AppRoutes, RoutePath } from 'shared/config';

export default {
  title: 'pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
} as Meta<ComponentProps<typeof ArticleDetailsPage>>;

type ArticleDetailsPageStory = StoryObj<typeof ArticleDetailsPage>;

const commentsEntities = mockedComments.reduce<Record<string, Comment>>((acc, comment) => ({
  ...acc,
  [comment.id]: comment,
}), {});
const commentsIds = mockedComments.map(comment => comment.id);

const parameters = {
  reactRouter: reactRouterParameters({
    location: {
      pathParams: { id: '1', },
    },
    routing: { path: RoutePath[AppRoutes.ARTICLE_DETAILS](':id'), },
  }
  ),
};

export const Default: ArticleDetailsPageStory = {
  args: {},
  parameters,
  decorators: [StoreDecorator(
    {
      articleDetails: {
        data: mockedArticle,
      },
      articleComments: {
        entities: commentsEntities,
        ids: commentsIds,
      },
    },
    { articleComments: articleCommentsReducer, articleDetails: articleDetailsReducer, }
  ),],
};

export const Loading: ArticleDetailsPageStory = {
  args: {},
  parameters,
  decorators: [StoreDecorator(
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
    { articleComments: articleCommentsReducer, articleDetails: articleDetailsReducer, }
  ),],
};

export const Error: ArticleDetailsPageStory = {
  args: {},
  parameters,
  decorators: [StoreDecorator(
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
    { articleComments: articleCommentsReducer, articleDetails: articleDetailsReducer, }
  ),],
};
