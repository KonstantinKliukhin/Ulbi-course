import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { CustomPopover } from './CustomPopover';

export default {
  title: 'shared/Popups/CustomPopover',
  component: CustomPopover,
} as Meta<ComponentProps<typeof CustomPopover>>;

type CustomPopoverStory = StoryObj<typeof CustomPopover>;

export const Default: CustomPopoverStory = {
  args: { },
};
