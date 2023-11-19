import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Text } from '../Text/Text';

export default {
  title: 'shared/Card',
  component: Card,
} as Meta<ComponentProps<typeof Card>>;

type CardStory = StoryObj<typeof Card>;

export const Default: CardStory = {
  args: {
    children: <Text title="Some Title" text="Some Text"/>,
  },
};
