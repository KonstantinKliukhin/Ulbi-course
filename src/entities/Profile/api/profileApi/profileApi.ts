import { $rtkApi } from '@/shared/api';
import { type Profile } from '../../model/types/profile';

interface GetProfileByIdArg {
  userId: string;
}

interface UpdateProfileArg {
  profile: Profile;
  userId: string;
}

export enum ProfileApiTags {
  PROFILE = 'PROFILE',
}

export const profileApi = $rtkApi.enhanceEndpoints({
  addTagTypes: Object.values<ProfileApiTags>(ProfileApiTags),
})
  .injectEndpoints({
    endpoints: (build) => ({
      getProfileById: build.query<Profile, GetProfileByIdArg>({
        query: (arg) => ({
          url: `/profile/${arg.userId}`,
        }),
        providesTags: (_, __, arg) => [{
          id: arg.userId, type: ProfileApiTags.PROFILE,
        },],
      }),

      updateProfile: build.mutation<Profile, UpdateProfileArg>({
        query: (arg) => ({
          url: `/profile/${arg.userId}`,
          method: 'PATCH',
          body: arg.profile,
        }),
        invalidatesTags: (_, __, arg) => [{
          type: ProfileApiTags.PROFILE,
          id: arg.userId,
        },],
      }),
    }),
  });

export const {
  useGetProfileByIdQuery,
  useUpdateProfileMutation,
} = profileApi;
