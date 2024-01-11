import React, { memo, useCallback } from 'react';
import { RatingCard } from '@/entities/Rating';
import { useTranslation } from 'react-i18next';
import { useGetProfileRatingQuery, useRateProfileMutation } from '../../api/profileRatingApi';
import { useAppSelector } from '@/shared/lib';
import { getUserAuthData } from '@/entities/User';

interface ProfileRatingProps {
  className?: string;
  profileId: string;
}

const ProfileRating = memo<ProfileRatingProps>(function ProfileRating (props) {
  const { t, } = useTranslation('profile');
  const user = useAppSelector(getUserAuthData);
  const profileRatingQueryData = useGetProfileRatingQuery(
    { profileId: props.profileId, userId: user?.id ?? '', },
    { skip: !user?.id, }
  );

  const [rateProfile,] = useRateProfileMutation();

  const onAccept = useCallback((rate: number, feedback?: string) => {
    void rateProfile({ userId: user?.id ?? '', profileId: props.profileId, rating: { rate, feedback, }, });
  }, [props.profileId, rateProfile, user?.id,]);

  const onCancel = useCallback((rate: number) => {
    void rateProfile({ userId: user?.id ?? '', profileId: props.profileId, rating: { rate, }, });
  }, [props.profileId, rateProfile, user?.id,]);

  return (
    <RatingCard
      className={props.className}
      hasFeedback
      rate={profileRatingQueryData.data?.rate}
      isRatingLoading={profileRatingQueryData.isLoading}
      title={t('profile_rating_title')}
      feedbackTitle={t('profile_leave_feedback_title')}
      onAccept={onAccept}
      onCancel={onCancel}
    />
  );
});

export default ProfileRating;
