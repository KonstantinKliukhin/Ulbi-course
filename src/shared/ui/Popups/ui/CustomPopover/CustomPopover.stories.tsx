import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { CustomPopover } from './CustomPopover';
import { Button } from '../../../Button/Button';
import { Text } from '../../../Text/Text';

export default {
  title: 'shared/Popups/CustomPopover',
  component: CustomPopover,
} as Meta<ComponentProps<typeof CustomPopover>>;

type CustomPopoverStory = StoryObj<typeof CustomPopover>;

export const Default: CustomPopoverStory = {
  args: {
    trigger: <Button theme="outline">Trigger</Button>,
    children: <Text align="center" title="Children" text="Here can be any your component"/>,
  },
};
