import { type FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector, useInitialEffect, withLazySlices } from 'shared/lib';
import {
  fetchProfileData,
  getProfile,
  getProfileError,
  getProfileIsLoading,
  getProfileReadonly,
  type Profile,
  ProfileCard,
  profileReducer,
  updateProfileData
} from 'entities/Profile';
import { ProfilePageHeader } from '../ProfilePageHeader/ProfilePageHeader';
import { FormProvider } from 'react-hook-form';
import { useProfileForm } from 'features/ProfileForm';
import { useParams } from 'react-router-dom';

const ProfilePage: FC = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(getProfile);
  const profileIsLoading = useAppSelector(getProfileIsLoading);
  const profileError = useAppSelector(getProfileError);
  const profileReadonly = useAppSelector(getProfileReadonly);
  const profileForm = useProfileForm(profile);

  useInitialEffect(useCallback(() => {
    if (params.id) {
      void dispatch(fetchProfileData(params.id));
    }
  }, [dispatch, params.id,]));

  const onSubmit = useCallback((values: Profile) => {
    if (params.id) {
      void dispatch(updateProfileData({ profileForm: values, profileId: params.id, }));
    }
  }, [dispatch, params.id,]);

  return (
    <>
      <FormProvider {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onSubmit)}>
          <ProfilePageHeader/>
          <ProfileCard
            data={profile}
            error={profileError}
            readonly={profileReadonly}
            avatar={profileForm.getValues('avatar')}
            isLoading={profileIsLoading}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default withLazySlices(
  {
    reducers: { profile: profileReducer, },
    onlyIfSliceReady: true,
  }
)(ProfilePage);
