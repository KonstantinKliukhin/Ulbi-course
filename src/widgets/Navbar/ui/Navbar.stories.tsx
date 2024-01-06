import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { API_ROUTES } from 'shared/api';
import { mockedAdminUser, mockedManagerUser, mockedNotifications, mockedUser } from 'shared/mocks';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';

export default {
  title: 'widgets/Navbar',
  component: Navbar,
} as Meta<ComponentProps<typeof Navbar>>;

type NavbarStory = StoryObj<typeof Navbar>;

const mockDataParameters = [
  {
    url: `${API_ROUTES.notifications()}`,
    method: 'GET',
    status: 200,
    response: mockedNotifications,
  },
];

export const UnAuthorized: NavbarStory = {};

export const SimpleUser: NavbarStory = {
  parameters: {
    mockData: mockDataParameters,
  },
  decorators: [
    StoreDecorator({
      user: {
        authData: mockedUser,
      },
    }),
  ],
};

export const AdminUser: NavbarStory = {
  parameters: {
    mockData: mockDataParameters,
  },
  decorators: [
    StoreDecorator({
      user: {
        authData: mockedAdminUser,
      },
    }),
  ],
};

export const ManagerUser: NavbarStory = {
  parameters: {
    mockData: mockDataParameters,
  },
  decorators: [
    StoreDecorator({
      user: {
        authData: mockedManagerUser,
      },
    }),
  ],
};
