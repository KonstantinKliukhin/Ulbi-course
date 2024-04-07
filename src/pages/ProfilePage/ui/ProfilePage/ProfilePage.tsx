import { type FC, Suspense } from 'react';
import {
  withLazySlices
} from '@/shared/lib';

import { ProfilePageHeader } from '../ProfilePageHeader/ProfilePageHeader';
import { EditableProfile } from '@/features/EditableProfile';
import { useParams } from 'react-router-dom';
import { Loader, Page, Text, VStack } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import {
  useProfileReadonly
} from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profilePageReducer } from '../../model/slice/profilePageSlice';
import { ProfileRating } from '@/features/ProfileRating';
import { useUserAuthData } from '@/entities/User';

const ProfilePage: FC = () => {
  const params = useParams<{ id: string }>();
  const { t, } = useTranslation('profile');
  const readonly = useProfileReadonly();
  const user = useUserAuthData();
  const isCurrentUserProfile = params?.id === user?.id;

  if (!params.id) {
    return <Text title={t('profile_not_found')}/>;
  }

  return (
    <Page data-testid="Profile">
      <ProfilePageHeader />
      <VStack align="stretch" yGap={32}>
        <EditableProfile profileId={params.id} readonly={readonly} />
        {!isCurrentUserProfile
          ? (
            <Suspense fallback={<Loader centered />}>
              <ProfileRating profileId={params.id}/>
            </Suspense>
            )
          : null}
      </VStack>
    </Page>
  );
};

export default withLazySlices({
  reducers: { profilePage: profilePageReducer, },
  onlyIfSliceReady: true,
  removeOnUnmount: true,
})(ProfilePage);
