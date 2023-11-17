import { type FC, type MouseEvent, useCallback, useMemo } from 'react';
import cls from './ProfilePageHeader.module.scss';
import { classNames, useAppDispatch, useAppSelector } from 'shared/lib';
import { Button, ButtonTheme, Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { getProfile, getProfileReadonly, profileActions } from 'entities/Profile';
import { useFormContext } from 'react-hook-form';
import { getUserAuthData } from 'entities/User';
import { useParams } from 'react-router-dom';

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = props => {
  const { t: tProfile, } = useTranslation('profile');
  const { t: tGlobal, } = useTranslation();
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const { reset, } = useFormContext();
  const profile = useAppSelector(getProfile);
  const profileReadonly = useAppSelector(getProfileReadonly);
  const user = useAppSelector(getUserAuthData);
  const isCurrentUserProfile = user?.id === params.id;

  const onEdit = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(profileActions.setReadonly(false));
  }, [dispatch,]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
    if (profile) {
      reset(profile);
    }
  }, [dispatch, profile, reset,]);

  const buttons = useMemo(() => {
    if (!isCurrentUserProfile) return <div/>;

    if (profileReadonly) {
      return (
        <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
          {tGlobal('edit')}
        </Button>
      );
    } else {
      return (
        <>
          <Button theme={ButtonTheme.OUTLINE} type="submit">
            {tGlobal('save')}
          </Button>
          <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit} type="reset">
            {tGlobal('cancel')}
          </Button>
        </>
      );
    }
  }, [isCurrentUserProfile, profileReadonly, onEdit, tGlobal, onCancelEdit,]);

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [props.className,])}>
      <Text title={tProfile('profile')}/>
      <div className={cls.buttons}>
        {buttons}
      </div>

    </div>
  );
};
