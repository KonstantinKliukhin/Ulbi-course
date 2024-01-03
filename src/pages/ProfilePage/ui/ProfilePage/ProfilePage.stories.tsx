import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator/storeDecorator';
import { mockedProfile, mockedUser } from 'shared/mocks';
import { profilePageReducer } from '../../model/slice/profilePageSlice';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';
import { RoutePath } from 'shared/config';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { profileApi } from 'entities/Profile/api/profileApi/profileApi';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
} as Meta<ComponentProps<typeof ProfilePage>>;

type ProfilePageStory = StoryObj<typeof ProfilePage>;

const routerParameters = {
  reactRouter: reactRouterParameters({
    location: {
      pathParams: { id: '1', },
    },
    routing: { path: RoutePath.profile(':id'), },
  }),
};

export const MyProfile: ProfilePageStory = {
  args: {},
  parameters: routerParameters,
  decorators: [StoreDecorator({
    user: {
      authData: mockedUser,
    },
    profilePage: {
      readonly: true,
    },
    api: {
      queries: {
        [`${profileApi.endpoints.getProfileById.name}({"userId":"1"})`]: {
          status: QueryStatus.fulfilled,
          data: mockedProfile,
        },
      },
    },
  }, { profilePage: profilePageReducer, }),],
};

export const NotMyProfile: ProfilePageStory = {
  args: {},
  parameters: routerParameters,
  decorators: [StoreDecorator({
    user: {
      authData: { ...mockedUser, id: '12313123', },
    },
    profilePage: {
      readonly: true,
    },
    api: {
      queries: {
        [`${profileApi.endpoints.getProfileById.name}({"userId":"1"})`]: {
          status: QueryStatus.fulfilled,
          data: mockedProfile,
        },
      },
    },
  }, { profilePage: profilePageReducer, }),],
};

export const Loading: ProfilePageStory = {
  args: {},
  parameters: routerParameters,
  decorators: [StoreDecorator({
    profilePage: {
      readonly: true,
    },
    user: {
      authData: mockedUser,
    },
    api: {
      queries: {
        [`${profileApi.endpoints.getProfileById.name}({"userId":"1"})`]: {
          status: QueryStatus.pending,
        },
      },
    },
  }, { profilePage: profilePageReducer, }),],
};

export const ProfileError: ProfilePageStory = {
  args: {},
  parameters: routerParameters,
  decorators: [StoreDecorator({
    user: {
      authData: mockedUser,
    },
    profilePage: {
      readonly: false,
    },
    api: {
      queries: {
        [`${profileApi.endpoints.getProfileById.name}({"userId":"1"})`]: {
          status: QueryStatus.rejected,
          error: { message: 'Some Api Error', },
        },
      },
    },
  }, { profilePage: profilePageReducer, }),],
};
