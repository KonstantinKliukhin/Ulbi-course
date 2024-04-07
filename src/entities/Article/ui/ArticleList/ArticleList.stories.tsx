import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleList } from './ArticleList';
import { createMockedArticles, mockedArticles } from '@/shared/mocks';
import cls from './ArticleList.stories.module.scss';
import { ArticleView } from '../../constants/articleView';

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
} as Meta<ComponentProps<typeof ArticleList>>;

type ArticleListStory = StoryObj<typeof ArticleList>;

export const Default: ArticleListStory = {
  args: {
    articles: createMockedArticles(50),
  },
};

export const SmallSkeleton: ArticleListStory = {
  args: {
    isLoading: true,
    articles: [],
    skeletonsCount: 12,
  },
};

export const BigSkeleton: ArticleListStory = {
  args: {
    isLoading: true,
    articles: [],
    skeletonsCount: 12,
    view: ArticleView.BIG,
  },
};

export const BigView: ArticleListStory = {
  args: {
    articles: mockedArticles,
    view: ArticleView.BIG,
  },
};

export const VirtualizedSmall: ArticleListStory = {
  args: {
    virtualized: true,
    articles: createMockedArticles(50),
    isLoading: false,
    skeletonsCount: 12,
    view: ArticleView.SMALL,
    savedItemIndex: 0,
  },
  render: (props) => (
    <div className={cls.virtualizedListWrapper}>
      <ArticleList {...props}/>
    </div>
  ),
};

export const VirtualizedBig: ArticleListStory = {
  args: {
    virtualized: true,
    articles: createMockedArticles(50),
    isLoading: false,
    skeletonsCount: 12,
    view: ArticleView.BIG,
    savedItemIndex: 0,
  },
  render: (props) => (
    <div className={cls.virtualizedListWrapper}>
      <ArticleList {...props}/>
    </div>
  ),
};
