import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { NotificationList } from './NotificationList';

export default {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,
} as Meta<ComponentProps<typeof NotificationList>>;

type NotificationListStory = StoryObj<typeof NotificationList>;

export const Default: NotificationListStory = {
  args: { },
};
