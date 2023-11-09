import { type FC, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector, withLazySlice } from 'shared/lib';
import {
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadonly,
  profileActions,
  ProfileCard,
  profileReducer
} from 'entities/Profile';
import { ProfilePageHeader } from 'pages/ProfilePage/ui/ProfilePageHeader/ProfilePageHeader';
import { validateAge } from '../lib/validateAge/validateAge';
import { type Country } from 'entities/Country';
import { type Currency } from 'entities/Currency';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const profileForm = useAppSelector(getProfileForm);
  const profileIsLoading = useAppSelector(getProfileIsLoading);
  const profileError = useAppSelector(getProfileError);
  const profileReadonly = useAppSelector(getProfileReadonly);

  useEffect(() => {
    void dispatch(fetchProfileData());
  }, [dispatch,]);

  const onChangeFirstname = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ firstname: value, }));
  }, [dispatch,]);

  const onChangeLastname = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ lastname: value, }));
  }, [dispatch,]);

  const onChangeAge = useCallback((value: string) => {
    const isValid = validateAge(value);
    if (!isValid) return;
    dispatch(profileActions.updateProfile({ age: Number(value), }));
  }, [dispatch,]);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ username: value, }));
  }, [dispatch,]);

  const onChangeAvatar = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ avatar: value, }));
  }, [dispatch,]);

  const onChangeCity = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ city: value, }));
  }, [dispatch,]);

  const onChangeCountry = useCallback((value: Country) => {
    dispatch(profileActions.updateProfile({ country: value, }));
  }, [dispatch,]);

  const onChangeCurrency = useCallback((value: Currency) => {
    dispatch(profileActions.updateProfile({ currency: value, }));
  }, [dispatch,]);

  return (
    <>
      <ProfilePageHeader readonly={profileReadonly}/>
      <ProfileCard
        onChangeCountry={onChangeCountry}
        onChangeCurrency={onChangeCurrency}
        onChangeAvatar={onChangeAvatar}
        onChangeUsername={onChangeUsername}
        onChangeFirstname={onChangeFirstname}
        onChangeLastname={onChangeLastname}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        readonly={profileReadonly}
        data={profileForm}
        error={profileError}
        isLoading={profileIsLoading}
      />
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
