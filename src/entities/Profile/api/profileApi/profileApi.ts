import { $rtkApi } from '@/shared/api';
import { type Profile } from '../../model/types/profile';

interface GetProfileByIdArg {
  profileId: string;
}

interface UpdateProfileArg {
  profile: Profile;
  profileId: string;
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
          url: `/profile/${arg.profileId}`,
        }),
        providesTags: (_, __, arg) => [{
          id: arg.profileId, type: ProfileApiTags.PROFILE,
        },],
      }),

      updateProfile: build.mutation<Profile, UpdateProfileArg>({
        query: (arg) => ({
          url: `/profile/${arg.profileId}`,
          method: 'PATCH',
          body: arg.profile,
        }),
        invalidatesTags: (_, __, arg) => [{
          type: ProfileApiTags.PROFILE,
          id: arg.profileId,
        },],
      }),
    }),
  });

export const {
  useGetProfileByIdQuery,
  useUpdateProfileMutation,
} = profileApi;
