import { type FC } from 'react';
import {
  useAppSelector,
  withLazySlices
} from '@/shared/lib';

import { ProfilePageHeader } from '../ProfilePageHeader/ProfilePageHeader';
import { EditableProfile } from '@/features/EditableProfile';
import { useParams } from 'react-router-dom';
import { Page, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profilePageReducer } from '../../model/slice/profilePageSlice';

const ProfilePage: FC = () => {
  const params = useParams<{ id: string }>();
  const { t, } = useTranslation('profile');
  const readonly = useAppSelector(getProfileReadonly);

  if (!params.id) {
    return <Text title={t('profile_not_found')}/>;
  }

  return (
    <Page>
      <ProfilePageHeader />
      <EditableProfile userId={params.id} readonly={readonly} />
    </Page>
  );
};

export default withLazySlices({
  reducers: { profilePage: profilePageReducer, },
  onlyIfSliceReady: true,
  removeOnUnmount: true,
})(ProfilePage);
