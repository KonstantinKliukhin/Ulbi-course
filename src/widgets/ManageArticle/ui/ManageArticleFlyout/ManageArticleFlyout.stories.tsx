import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ManageArticleFlyout } from './ManageArticleFlyout';
import { mockedArticle } from 'shared/mocks';
import { action } from '@storybook/addon-actions';

export default {
  title: 'widgets/ManageArticle/ManageArticleFlyout',
  component: ManageArticleFlyout,
} as Meta<ComponentProps<typeof ManageArticleFlyout>>;

type ManageArticleFlyoutStory = StoryObj<typeof ManageArticleFlyout>;

export const Edit: ManageArticleFlyoutStory = {
  args: {
    article: mockedArticle,
    open: true,
    onClose: action('onClose'),
    mode: 'edit',
  },
};

export const Create: ManageArticleFlyoutStory = {
  args: {
    open: true,
    onClose: action('onClose'),
    mode: 'edit',
  },
};
