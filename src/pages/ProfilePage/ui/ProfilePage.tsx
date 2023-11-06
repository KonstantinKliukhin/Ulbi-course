import { type FC, useEffect } from 'react';
import { useAppDispatch, withLazySlice } from 'shared/lib';
import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchProfileData());
  }, [dispatch,]);

  return (
    <ProfileCard/>
  );
};

export default withLazySlice(ProfilePage, { name: 'profile', reducer: profileReducer, });
