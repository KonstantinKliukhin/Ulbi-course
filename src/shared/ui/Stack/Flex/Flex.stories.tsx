import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Flex } from './Flex';

export default {
  title: 'shared/Stack/Flex',
  component: Flex,
} as Meta<ComponentProps<typeof Flex>>;

type FlexStory = StoryObj<typeof Flex>;

export const Default: FlexStory = {
  args: {
    children: (
      <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>forth</div>
      </>
    ),
  },
};

export const Row: FlexStory = {
  args: {
    direction: 'row',
    children: (
      <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>forth</div>
      </>
    ),
  },
};

export const RowStart: FlexStory = {
  args: {
    direction: 'column',
    justify: 'between',
    children: (
      <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>forth</div>
      </>
    ),
  },
};

export const RowBetweenStart: FlexStory = {
  args: {
    direction: 'column',
    justify: 'between',
    align: 'start',
    children: (
      <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>forth</div>
      </>
    ),
  },
};

export const RowXGap4: FlexStory = {
  args: {
    xGap: 4,
    align: 'start',
    children: (
      <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>forth</div>
      </>
    ),
  },
};

export const Column: FlexStory = {
  args: {
    direction: 'column',
    children: (
      <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>forth</div>
      </>
    ),
  },
};

export const ColumnBetween: FlexStory = {
  args: {
    direction: 'column',
    justify: 'between',
    children: (
      <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>forth</div>
      </>
    ),
  },
};

export const ColumnYGap4: FlexStory = {
  args: {
    yGap: 4,
    align: 'start',
    direction: 'column',
    children: (
      <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>forth</div>
      </>
    ),
  },
};
