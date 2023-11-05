import { type FC } from 'react';
import { withLazySlice } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { profileReducer } from 'entities/Profile';

const ProfilePage: FC = () => {
  const { t, } = useTranslation();
  return (
    <>
      {t('nav_profile')}
    </>
  );
};

export default withLazySlice(ProfilePage, { name: 'profile', reducer: profileReducer, });
