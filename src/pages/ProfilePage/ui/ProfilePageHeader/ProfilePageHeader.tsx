import { type FC, type MouseEvent, useCallback } from 'react';
import cls from './ProfilePageHeader.module.scss';
import { classNames, useAppDispatch, useAppSelector } from 'shared/lib';
import { Button, ButtonTheme, Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { getProfile, profileActions } from 'entities/Profile';
import { useFormContext } from 'react-hook-form';

interface ProfilePageHeaderProps {
  className?: string
  readonly: boolean
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = props => {
  const { t: tProfile, } = useTranslation('profile');
  const { t: tGlobal, } = useTranslation();
  const dispatch = useAppDispatch();
  const { reset, } = useFormContext();
  const profile = useAppSelector(getProfile);

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

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [props.className,])}>
      <Text title={tProfile('profile')}/>
      <div className={cls.buttons}>
        {props.readonly
          ? (
            <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
              {tGlobal('edit')}
            </Button>
            )
          : (
            <>
              <Button theme={ButtonTheme.OUTLINE} type="submit">
                {tGlobal('save')}
              </Button>
              <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit} type="reset">
                {tGlobal('cancel')}
              </Button>
            </>
            )
                }
      </div>

    </div>
  );
};
