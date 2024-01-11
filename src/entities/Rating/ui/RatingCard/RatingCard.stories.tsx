import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { RatingCard } from './RatingCard';
import { action } from '@storybook/addon-actions';

export default {
  title: 'entities/Rating/RatingCard',
  component: RatingCard,
} as Meta<ComponentProps<typeof RatingCard>>;

type RatingCardStory = StoryObj<typeof RatingCard>;

export const Default: RatingCardStory = {
  args: {},
};

export const HasFeedback: RatingCardStory = {
  args: {
    hasFeedback: true,
    onCancel: action('onCancel'),
    onAccept: action('onAccept'),
  },
};

export const Rated: RatingCardStory = {
  args: {
    hasFeedback: true,
    rate: 4,
  },
};
