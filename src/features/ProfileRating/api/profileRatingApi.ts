import { API_ROUTES } from '@/shared/api';
import type { Rating, RatingDto } from '@/entities/Rating';
import { profileApi } from '@/entities/Profile';

interface GetProfileRatingArg {
  profileId: string;
  userId: string;
}

interface RateProfileArg {
  userId: string;
  profileId: string;
  rating: RatingDto;
}

export const profileRatingApi = profileApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileRating: build.query<Rating, GetProfileRatingArg>({
      query: (arg) => ({
        url: API_ROUTES.profileRating(),
        params: {
          profileId: arg.profileId,
          userId: arg.userId,
        },
      }),
      transformResponse: (response: Rating[]) => response[0],
    }),
    rateProfile: build.mutation<unknown, RateProfileArg>({
      query: (arg) => ({
        url: API_ROUTES.profileRating(),
        method: 'POST',
        body: {
          userId: arg.userId,
          profileId: arg.profileId,
          feedback: arg.rating.feedback,
          rate: arg.rating.rate,
        },
      }),
    }),
  }),
});

export const {
  useGetProfileRatingQuery,
  useRateProfileMutation,
} = profileRatingApi;
