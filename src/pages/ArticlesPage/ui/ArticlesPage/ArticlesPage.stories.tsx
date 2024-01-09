import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ArticlesPage from './ArticlesPage';
import { StoreDecorator } from '@/shared/config/storybook/storeDecorator/storeDecorator';
import { createMockedArticles } from '@/shared/mocks';
import {
  ArticleSortField,
  ArticleType,
  ArticleView
} from '@/entities/Article';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.stories.module.scss';
import { API_ROUTES } from '@/shared/api';
import { articlesAdapter } from '../../model/adapters/articlesAdapter';
import { v4 as uuidV4 } from 'uuid';

export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
} as Meta<ComponentProps<typeof ArticlesPage>>;

type ArticlesPageStory = StoryObj<typeof ArticlesPage>;

const successMockDataParameters = [
  {
    url: `${API_ROUTES.articles()}?_expand=user&_page=1&_limit=20&_sort=created&_order=asc&q=`,
    method: 'GET',
    status: 200,
    delay: 1000,
    response: () => createMockedArticles(20).map(article => ({ ...article, id: uuidV4(), })),
  },
];

export const Default: ArticlesPageStory = {
  args: {},
  parameters: {
    mockData: successMockDataParameters,
  },
  decorators: [
    StoreDecorator(
      {
        articlesPage: {
          ...articlesAdapter.getInitialState(),
          page: 1,
          sort: ArticleSortField.CREATED,
          hasMore: true,
          isLoading: false,
          search: '',
          type: ArticleType.ALL,
          view: ArticleView.SMALL,
        },
      },
      {
        articlesPage: articlesPageReducer,
      }
    ),
  ],
  render: (props) => (
    <div className={cls.storybookWrapper}>
      <ArticlesPage {...props} />
    </div>
  ),
};

export const Loading: ArticlesPageStory = {
  args: {},
  parameters: {
    mockData: successMockDataParameters.map(data => ({ ...data, delay: 999999999, })),
  },
  decorators: [
    StoreDecorator(
      {
        articlesPage: {
          ...articlesAdapter.getInitialState(),
          page: 1,
          sort: ArticleSortField.CREATED,
          hasMore: true,
          isLoading: false,
          search: '',
          type: ArticleType.ALL,
          view: ArticleView.SMALL,
        },
      },
      {
        articlesPage: articlesPageReducer,
      }
    ),
  ],
  render: (props) => (
    <div className={cls.storybookWrapper}>
      <ArticlesPage {...props} />
    </div>
  ),
};

export const NotFound: ArticlesPageStory = {
  args: {},
  parameters: {
    mockData: successMockDataParameters.map(data => ({ ...data, response: [], delay: 0, })),
  },
  decorators: [
    StoreDecorator(
      {
        articlesPage: {
          ...articlesAdapter.getInitialState(),
          page: 1,
          sort: ArticleSortField.CREATED,
          hasMore: true,
          isLoading: false,
          search: '',
          type: ArticleType.ALL,
          view: ArticleView.SMALL,
        },
      },
      {
        articlesPage: articlesPageReducer,
      }
    ),
  ],
  render: (props) => (
    <div className={cls.storybookWrapper}>
      <ArticlesPage {...props} />
    </div>
  ),
};
