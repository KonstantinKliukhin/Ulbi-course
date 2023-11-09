import { type FC } from 'react';
import cls from './ProfileCard.module.scss';
import { classNames, withError, type WithErrorProps, withLoading, type WithLoadingProps } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Avatar, Input } from 'shared/ui';
import { type Profile } from 'entities/Profile';
import { compose } from '@reduxjs/toolkit';
import { type Currency, CurrencySelect } from 'entities/Currency/@x/profile';
import { type Country, CountrySelect } from 'entities/Country/@x/profile';

interface ProfileCardProps extends WithErrorProps, WithLoadingProps {
  className?: string
  data: Profile
  readonly?: boolean
  onChangeFirstname?: (value: string) => void
  onChangeLastname?: (value: string) => void
  onChangeAge?: (value: string) => void
  onChangeCity?: (value: string) => void
  onChangeUsername?: (value: string) => void
  onChangeAvatar?: (value: string) => void
  onChangeCurrency?: (value: Currency) => void
  onChangeCountry?: (value: Country) => void
}

const ProfileCard: FC<ProfileCardProps> = props => {
  const { t, } = useTranslation('profile');

  return (
    <div
      className={classNames(
        cls.ProfileCard,
        { [cls.editing]: !props.readonly, },
        [props.className,]
      )}
    >
      <div className={cls.body}>
        <Avatar className={cls.avatar} size={125} src={props.data.avatar}/>
        <Input
          readonly={props.readonly}
          className={cls.input}
          value={props.data?.firstname}
          placeholder={t('your_firstname_label')}
          onChange={props.onChangeFirstname}
        />
        <Input
          readonly={props.readonly}
          className={cls.input}
          value={props.data?.lastname}
          placeholder={t('your_lastname_label')}
          onChange={props.onChangeLastname}
        />
        <Input
          pattern="\d."
          readonly={props.readonly}
          className={cls.input}
          value={props.data?.age}
          placeholder={t('your_age_label')}
          onChange={props.onChangeAge}
        />
        <Input
          readonly={props.readonly}
          className={cls.input}
          value={props.data?.avatar}
          placeholder={t('your_avatar_label')}
          onChange={props.onChangeAvatar}
        />
        <Input
          readonly={props.readonly}
          className={cls.input}
          value={props.data?.username}
          placeholder={t('username_label')}
          onChange={props.onChangeUsername}
        />
        <CurrencySelect
          readonly={props.readonly}
          className={cls.input}
          value={props.data?.currency}
          onChange={props.onChangeCurrency}
        />
        <CountrySelect
          readonly={props.readonly}
          className={cls.input}
          value={props.data?.country}
          onChange={props.onChangeCountry}
        />
      </div>
    </div>
  );
};

const ComposedProfileCard = compose<typeof ProfileCard>(
  withLoading,
  withError
)(ProfileCard);

export { ComposedProfileCard as ProfileCard };
