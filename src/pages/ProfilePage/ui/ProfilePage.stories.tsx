import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { mockedProfile } from 'shared/mocks';
import { profileReducer } from 'entities/Profile';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
} as Meta<ComponentProps<typeof ProfilePage>>;

type ProfilePageStory = StoryObj<typeof ProfilePage>;

export const Primary: ProfilePageStory = {
  args: {},
  decorators: [StoreDecorator({
    profile: {
      error: null,
      isLoading: false,
      profile: mockedProfile,
      readonly: true,
    },
  }, { profile: profileReducer, }),],
};

export const Loading: ProfilePageStory = {
  args: {},
  decorators: [StoreDecorator({
    profile: {
      error: null,
      isLoading: true,
      profile: mockedProfile,
      readonly: true,
    },
  }, { profile: profileReducer, }),],
};

export const Error: ProfilePageStory = {
  args: {},
  decorators: [StoreDecorator({
    profile: {
      error: 'Some Api Error',
      isLoading: false,
      profile: mockedProfile,
      readonly: true,
    },
  }, { profile: profileReducer, }),],
};
