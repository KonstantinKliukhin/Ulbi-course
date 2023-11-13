import { type FC, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector, withLazySlice } from 'shared/lib';
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
import { ProfilePageHeader } from 'pages/ProfilePage/ui/ProfilePageHeader/ProfilePageHeader';
import { FormProvider } from 'react-hook-form';
import { useProfileForm } from 'features/ProfileForm';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(getProfile);
  const profileIsLoading = useAppSelector(getProfileIsLoading);
  const profileError = useAppSelector(getProfileError);
  const profileReadonly = useAppSelector(getProfileReadonly);
  const profileForm = useProfileForm(profile);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      void dispatch(fetchProfileData());
    }
  }, [dispatch,]);

  const onSubmit = useCallback((values: Profile) => {
    void dispatch(updateProfileData(values));
  }, [dispatch,]);

  return (
    <>
      <FormProvider {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onSubmit)}>
          <ProfilePageHeader readonly={profileReadonly}/>
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

export default withLazySlice(
  ProfilePage,
  {
    name: 'profile',
    reducer: profileReducer,
    onlyIfSliceReady: true,
  }
);
