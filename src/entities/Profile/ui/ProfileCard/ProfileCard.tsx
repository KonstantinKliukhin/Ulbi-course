import { type FC } from 'react';
import cls from './ProfileCard.module.scss';
import { classNames, useAppSelector } from 'shared/lib';
import { getProfile } from '../../model/selectors/getProfile/getProfile';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Button, Input } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';

interface ProfileCardProps {
  className?: string
}

export const ProfileCard: FC<ProfileCardProps> = props => {
  const { t: tProfile, } = useTranslation('profile');
  const { t: tGlobal, } = useTranslation('profile');
  const profile = useAppSelector(getProfile);

  return (
    <div className={classNames(cls.ProfileCard, {}, [props.className,])}>
      <div className={cls.header}>
        <Text title={tProfile('profile')}/>
        <Button theme={ButtonTheme.OUTLINE}>
          {tGlobal('edit')}
        </Button>
      </div>
      <div className={cls.body}>
        <Input
          className={cls.input}
          value={profile?.firstname}
          placeholder={tProfile('your_firstname_label')}
        />
        <Input
          className={cls.input}
          value={profile?.lastname}
          placeholder={tProfile('your_lastname_label')}
        />
      </div>
    </div>
  );
};
