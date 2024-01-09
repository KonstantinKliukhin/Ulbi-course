import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { NotificationsPopover } from './NotificationsPopover';
import { API_ROUTES } from '@/shared/api';
import { mockedNotifications } from '@/shared/mocks';

export default {
  title: 'features/ViewNotifications/NotificationsPopover',
  component: NotificationsPopover,
} as Meta<ComponentProps<typeof NotificationsPopover>>;

type NotificationsPopoverStory = StoryObj<typeof NotificationsPopover>;

const mockDataParameters = [
  {
    url: `${API_ROUTES.notifications()}`,
    method: 'GET',
    status: 200,
    response: mockedNotifications,
  },
];

export const Default: NotificationsPopoverStory = {
  parameters: {
    mockData: mockDataParameters,
  },
};
