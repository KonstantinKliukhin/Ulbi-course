import { type FC, useCallback } from 'react';
import cls from './ProfilePageHeader.module.scss';
import { classNames, useAppDispatch } from 'shared/lib';
import { Text } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { profileActions, updateProfileData } from 'entities/Profile';

interface ProfilePageHeaderProps {
  className?: string
  readonly: boolean
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = props => {
  const { t: tProfile, } = useTranslation('profile');
  const { t: tGlobal, } = useTranslation();
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch,]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch,]);

  const onSave = useCallback(() => {
    void dispatch(updateProfileData());
  }, [dispatch,]);

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
              <Button theme={ButtonTheme.OUTLINE} onClick={onSave}>
                {tGlobal('save')}
              </Button>
              <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
                {tGlobal('cancel')}
              </Button>
            </>
            )
                }
      </div>

    </div>
  );
};
