import { memo, useCallback } from 'react';
import {
  type Profile, ProfileCard, useGetProfileByIdQuery, useUpdateProfileMutation
} from '@/entities/Profile';
import { useProfileForm } from '../../model/hooks/useProfileForm/useProfileForm';
import { FormProvider } from 'react-hook-form';
import { type RtkError } from '@/shared/types';

interface EditProfileFormProviderProps {
  className?: string;
  userId: string;
  readonly: boolean;
}

export const EDITABLE_PROFILE_FORM_ID = 'EDITABLE_PROFILE_FORM_ID';

export const EditableProfile = memo<EditProfileFormProviderProps>(
  function EditableProfile (props) {
    const profileQueryData = useGetProfileByIdQuery({ userId: props.userId, });
    const [updateProfile, updateProfileData,] = useUpdateProfileMutation();
    const profileForm = useProfileForm(profileQueryData.data);
    const formAvatar = profileForm.watch('avatar');
    const onSubmit = useCallback(
      (values: Profile) => {
        void updateProfile({ userId: props.userId, profile: values, });
      },
      [props.userId, updateProfile,]
    );

    const error = (updateProfileData.error || profileQueryData.error) as RtkError;
    const isLoading = updateProfileData.isLoading || profileQueryData.isLoading;
    const avatar = props.readonly ? profileQueryData.data?.avatar : formAvatar;
    const profileData = props.readonly ? profileQueryData.data : undefined;

    return (
      <FormProvider {...profileForm}>
        <form
          id={EDITABLE_PROFILE_FORM_ID}
          className={props.className}
          onSubmit={profileForm.handleSubmit(onSubmit)}
        >
          <ProfileCard
            readonly={props.readonly}
            data={profileData}
            error={error?.message}
            isLoading={isLoading}
            avatar={avatar}
          />
        </form>
      </FormProvider>
    );
  });
