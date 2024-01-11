import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from '@/shared/config/storybook';
import { mockedProfile, mockedUser } from '@/shared/mocks';
import { profilePageReducer } from '../../model/slice/profilePageSlice';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';
import { RoutePath } from '@/shared/config';
import { API_ROUTES } from '@/shared/api';

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

const successMockDataParameters = [
  {
    url: `${API_ROUTES.profile('1')}`,
    method: 'GET',
    status: 200,
    response: mockedProfile,
  },
  {
    url: `${API_ROUTES.profileRating()}`,
    method: 'POST',
    status: 200,
  },
];

export const MyProfile: ProfilePageStory = {
  args: {},
  parameters: { ...routerParameters, mockData: successMockDataParameters, },
  decorators: [
    StoreDecorator(
      {
        user: {
          authData: mockedUser,
        },
        profilePage: {
          readonly: true,
        },
      },
      { profilePage: profilePageReducer, }
    ),
  ],
};

export const NotMyProfile: ProfilePageStory = {
  args: {},
  parameters: { ...routerParameters, mockData: successMockDataParameters, },
  decorators: [
    StoreDecorator(
      {
        user: {
          authData: { ...mockedUser, id: '12313123', },
        },
        profilePage: {
          readonly: true,
        },
      },
      { profilePage: profilePageReducer, }
    ),
  ],
};

export const Loading: ProfilePageStory = {
  args: {},
  parameters: {
    ...routerParameters,
    mockData: successMockDataParameters.map(data => ({ ...data, delay: 999999999, })),
  },
  decorators: [
    StoreDecorator(
      {
        profilePage: {
          readonly: true,
        },
        user: {
          authData: mockedUser,
        },
      },
      { profilePage: profilePageReducer, }
    ),
  ],
};

export const ProfileError: ProfilePageStory = {
  args: {},
  parameters: {
    ...routerParameters,
    mockData: successMockDataParameters.map(data => ({
      ...data,
      response: { message: 'Some Api Error', },
      status: 404,
    })),
  },
  decorators: [StoreDecorator({
    user: {
      authData: mockedUser,
    },
    profilePage: {
      readonly: false,
    },
  }, { profilePage: profilePageReducer, }),],
};
