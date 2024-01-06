import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { mockedAdminUser, mockedManagerUser, mockedUser } from 'shared/mocks';

export default {
  title: 'features/ViewAvatarDropdown/AvatarDropdown',
  component: AvatarDropdown,
} as Meta<ComponentProps<typeof AvatarDropdown>>;

type AvatarDropdownStory = StoryObj<typeof AvatarDropdown>;

export const SimpleUser: AvatarDropdownStory = {
  decorators: [
    StoreDecorator({
      user: {
        authData: mockedUser,
      },
    }),
  ],
};

export const AdminUser: AvatarDropdownStory = {
  decorators: [
    StoreDecorator({
      user: {
        authData: mockedAdminUser,
      },
    }),
  ],
};

export const ManagerUser: AvatarDropdownStory = {
  decorators: [
    StoreDecorator({
      user: {
        authData: mockedManagerUser,
      },
    }),
  ],
};
