import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ArticleBlockCard } from './ArticleBlockCard';
import { mockedArticle } from 'shared/mocks';

export default {
  title: 'entities/Article/ArticleBlockCard',
  component: ArticleBlockCard,
} as Meta<ComponentProps<typeof ArticleBlockCard>>;

type ArticleBlockCardStory = StoryObj<typeof ArticleBlockCard>;

export const Default: ArticleBlockCardStory = {
  args: {
    block: mockedArticle.blocks[0],
  },
};

export const Outlined: ArticleBlockCardStory = {
  args: {
    block: mockedArticle.blocks[0],
    theme: 'outlined',
  },
};

export const WithName: ArticleBlockCardStory = {
  args: {
    block: mockedArticle.blocks[0],
  },
};

export const WithTitle: ArticleBlockCardStory = {
  args: {
    block: mockedArticle.blocks[2],
  },
};

export const WithoutNameAndTitle: ArticleBlockCardStory = {
  args: {
    block: mockedArticle.blocks[1],
  },
};
