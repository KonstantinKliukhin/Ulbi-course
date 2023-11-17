import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleDetails } from './ArticleDetails';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { mockedArticle } from 'shared/mocks';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

export default {
  title: 'entities/Article/ArticleDetails',
  component: ArticleDetails,
} as Meta<ComponentProps<typeof ArticleDetails>>;

type ArticleDetailsStory = StoryObj<typeof ArticleDetails>;

export const Default: ArticleDetailsStory = {
  args: {},
  decorators: [StoreDecorator({
    articleDetails: {
      isLoading: false,
      error: null,
      data: mockedArticle,
    },
  }, { articleDetails: articleDetailsReducer, }),],
};

export const Loading: ArticleDetailsStory = {
  args: {},
  decorators: [StoreDecorator({
    articleDetails: {
      isLoading: true,
      error: null,
      data: null,
    },
  }, { articleDetails: articleDetailsReducer, }),],
};

export const Error: ArticleDetailsStory = {
  args: {},
  decorators: [StoreDecorator({
    articleDetails: {
      isLoading: false,
      error: 'Some Api error',
      data: null,
    },
  }, { articleDetails: articleDetailsReducer, }),],
};
