import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { StarsRating } from './StarsRating';
import { action } from '@storybook/addon-actions';

export default {
  title: 'shared/StarsRating',
  component: StarsRating,
} as Meta<ComponentProps<typeof StarsRating>>;

type StarsRatingStory = StoryObj<typeof StarsRating>;

export const Default: StarsRatingStory = {
  args: {
    onSelect: action('onSelect'),
  },
};

export const Selected: StarsRatingStory = {
  args: {
    onSelect: action('onSelect'),
    selectedStars: 3,
  },
};

export const BigSize: StarsRatingStory = {
  args: {
    onSelect: action('onSelect'),
    size: 150,
  },
};
