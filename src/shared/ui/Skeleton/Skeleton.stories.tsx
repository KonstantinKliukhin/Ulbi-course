import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

export default {
  title: 'shared/Skeleton',
  component: Skeleton,
} as Meta<ComponentProps<typeof Skeleton>>;

type SkeletonStory = StoryObj<typeof Skeleton>;

export const Default: SkeletonStory = {
  args: {
    width: '100%',
    height: '200px',
  },
};

export const Circle: SkeletonStory = {
  args: {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
  },
};
