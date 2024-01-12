import { type FC, type MouseEvent, useCallback, useMemo } from 'react';
import { Button, FormHeader } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useUserAuthData } from '@/entities/User';
import { useParams } from 'react-router-dom';
import {
  useProfileReadonly
} from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useProfilePageActions } from '../../model/slice/profilePageSlice';
import { EDITABLE_PROFILE_FORM_ID } from '@/features/EditableProfile';

export const ProfilePageHeader: FC = () => {
  const { t: tProfile, } = useTranslation('profile');
  const { t: tGlobal, } = useTranslation();
  const params = useParams<{ id: string }>();
  const profileReadonly = useProfileReadonly();
  const user = useUserAuthData();
  const isCurrentUserProfile = user?.id === params.id;
  const { setReadonly, cancelEdit, } = useProfilePageActions();
  const onEdit = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setReadonly(false);
  }, [setReadonly,]);

  const onCancelEdit = useCallback(() => {
    cancelEdit();
  }, [cancelEdit,]);

  const buttons = useMemo(() => {
    if (!isCurrentUserProfile) return <div />;

    if (profileReadonly) {
      return (
        <Button
          data-testid="ProfilePageHeader.EditButton"
          type="button"
          theme="outline"
          onClick={onEdit}
        >
          {tGlobal('edit')}
        </Button>
      );
    } else {
      return (
        <>
          <Button
            theme="outline"
            type="submit"
            form={EDITABLE_PROFILE_FORM_ID}
            data-testid="ProfilePageHeader.SaveButton"
          >
            {tGlobal('save')}
          </Button>
          <Button
            theme="outlineRed"
            onClick={onCancelEdit}
            type="reset"
            form={EDITABLE_PROFILE_FORM_ID}
            data-testid="ProfilePageHeader.CancelButton"
          >
            {tGlobal('cancel')}
          </Button>
        </>
      );
    }
  }, [isCurrentUserProfile, profileReadonly, onEdit, tGlobal, onCancelEdit,]);

  return (
    <FormHeader
      title={tProfile('profile')}
      actions={buttons}
    />
  );
};
