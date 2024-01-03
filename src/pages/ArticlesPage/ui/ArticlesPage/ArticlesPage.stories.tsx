import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ArticlesPage from './ArticlesPage';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { mockedArticles } from 'shared/mocks';
import {
  type Article,
  ArticleSortField,
  ArticleType,
  ArticleView
} from 'entities/Article';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.stories.module.scss';

export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
} as Meta<ComponentProps<typeof ArticlesPage>>;

type ArticlesPageStory = StoryObj<typeof ArticlesPage>;

export const Default: ArticlesPageStory = {
  args: {},
  decorators: [
    StoreDecorator(
      {
        articlesPage: {
          ids: mockedArticles.map((article) => article.id),
          page: 1,
          sort: ArticleSortField.CREATED,
          hasMore: false,
          isLoading: false,
          search: '',
          type: ArticleType.ALL,
          view: ArticleView.SMALL,
          entities: mockedArticles.reduce<Record<string, Article>>(
            (acc, value) => ({
              ...acc,
              [value.id]: value,
            }),
            {}
          ),
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
