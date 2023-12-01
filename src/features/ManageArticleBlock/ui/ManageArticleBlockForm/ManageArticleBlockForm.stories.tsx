import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ManageArticleBlockForm from './ManageArticleBlockForm';
import { mockedArticleTextBlock } from 'shared/mocks';
import { action } from '@storybook/addon-actions';

export default {
  title: 'features/ManageArticleBlock/ManageArticleBlockForm',
  component: ManageArticleBlockForm,
} as Meta<ComponentProps<typeof ManageArticleBlockForm>>;

type ManageArticleBlockFormStory = StoryObj<typeof ManageArticleBlockForm>;

export const Edit: ManageArticleBlockFormStory = {
  args: {
    articleBlock: mockedArticleTextBlock,
    onCancel: action('onCancel'),
    onSubmit: action('onSubmit'),
    title: 'Edit Article',
  },
};

export const Create: ManageArticleBlockFormStory = {
  args: {
    articleBlock: undefined,
    onCancel: action('onCancel'),
    onSubmit: action('onSubmit'),
    title: 'Edit Article',
  },
};
