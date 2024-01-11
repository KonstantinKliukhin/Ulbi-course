import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import ProfileRating from './ProfileRating';
import { API_ROUTES } from '@/shared/api';
import { mockedProfileRatings, mockedUser } from '@/shared/mocks';
import { StoreDecorator } from '@/shared/config/storybook/storeDecorator/storeDecorator';

export default {
  title: 'features/ProfileRating/ProfileRating',
  component: ProfileRating,
} as Meta<ComponentProps<typeof ProfileRating>>;

type ProfileRatingStory = StoryObj<typeof ProfileRating>;

const getMockDataParameter = {
  url: `${API_ROUTES.profileRating()}?userId=${mockedUser.id}&profileId=${mockedUser.id}`,
  method: 'GET',
  status: 200,
  response: mockedProfileRatings,
};

const postMockDataParameter = {
  url: API_ROUTES.profileRating(),
  method: 'POST',
  status: 200,
};

export const Default: ProfileRatingStory = {
  parameters: {
    mockData: [postMockDataParameter, { ...getMockDataParameter, response: [], },],
  },
  args: {
    profileId: mockedUser.id,
  },
  decorators: [
    StoreDecorator({
      user: {
        authData: mockedUser,
      },
    }),
  ],
};

export const Loading: ProfileRatingStory = {
  parameters: {
    mockData: [{ ...getMockDataParameter, delay: 9999999, },],
  },
  args: {
    profileId: mockedUser.id,
  },
  decorators: [StoreDecorator({
    user: {
      authData: mockedUser,
    },
  }),],
};

export const Rated: ProfileRatingStory = {
  parameters: {
    mockData: [postMockDataParameter, getMockDataParameter,],
  },
  args: {
    profileId: mockedUser.id,
  },
  decorators: [StoreDecorator({
    user: {
      authData: mockedUser,
    },
  }),],
};
