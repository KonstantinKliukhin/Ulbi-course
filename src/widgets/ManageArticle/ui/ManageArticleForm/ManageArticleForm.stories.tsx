import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ManageArticleForm from './ManageArticleForm';
import { mockedArticle } from 'shared/mocks';
import { action } from '@storybook/addon-actions';

export default {
  title: 'widgets/ManageArticle/ManageArticleForm',
  component: ManageArticleForm,
} as Meta<ComponentProps<typeof ManageArticleForm>>;

type ManageArticleFormStory = StoryObj<typeof ManageArticleForm>;

export const Edit: ManageArticleFormStory = {
  args: {
    article: mockedArticle,
    title: 'Edit Article',
    onSubmit: action('onSubmit'),
    onCancel: action('onCancel'),
  },
};

export const Create: ManageArticleFormStory = {
  args: {
    title: 'Create Article',
    onSubmit: action('onSubmit'),
    onCancel: action('onCancel'),
  },
};
