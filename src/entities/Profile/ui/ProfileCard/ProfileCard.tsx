import { type FC, memo } from 'react';
import cls from './ProfileCard.module.scss';
import {
  classNames,
  type WithErrorProps,
  withLoading,
  type WithLoadingProps
} from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Avatar, FormCustomListBox, FormInput, Loader, Text, VStack } from 'shared/ui';
import { CURRENCY_OPTIONS } from 'entities/Currency/@x/profile';
import { COUNTRY_OPTIONS } from 'entities/Country/@x/profile';
import { type Profile } from '../../model/types/profile';

interface ProfileCardProps extends WithErrorProps, WithLoadingProps {
  className?: string;
  avatar?: string;
  readonly?: boolean;
  data?: Profile | null;
}

const ProfileCard: FC<ProfileCardProps> = memo<ProfileCardProps>(function ProfileCard (props) {
  const { t, } = useTranslation('profile');
  const { t: tGlobal, } = useTranslation();

  return (
    <div
      className={classNames(
        cls.ProfileCard,
        { [cls.editing]: !props.readonly, },
        [props.className,]
      )}
    >
      <VStack align="start" yGap={4} className={cls.body}>
        <Avatar className={cls.avatar} size={125} src={props?.avatar} />
        <FormInput
          value={props.readonly ? props.data?.firstname : undefined}
          name="firstname"
          readonly={props.readonly}
          label={t('your_firstname_label')}
          data-testid="ProfileCard.Firstname"
        />
        <FormInput
          value={props.readonly ? props.data?.lastname : undefined}
          name="lastname"
          readonly={props.readonly}
          label={t('your_lastname_label')}
          data-testid="ProfileCard.Lastname"
        />
        <FormInput
          value={props.readonly ? props.data?.age : undefined}
          name="age"
          readonly={props.readonly}
          label={t('your_age_label')}
          data-testid="ProfileCard.Age"
        />
        <FormInput
          value={props.readonly ? props.data?.city : undefined}
          name="city"
          readonly={props.readonly}
          label={t('your_city_label')}
          data-testid="ProfileCard.City"
        />
        <FormInput
          value={props.readonly ? props.data?.avatar : undefined}
          name="avatar"
          readonly={props.readonly}
          label={t('your_avatar_label')}
          data-testid="ProfileCard.Avatar"
        />
        <FormInput
          value={props.readonly ? props.data?.username : undefined}
          name="username"
          readonly={props.readonly}
          label={t('username_label')}
          data-testid="ProfileCard.Username"
        />
        <FormCustomListBox
          value={props.readonly ? props.data?.currency : undefined}
          name="currency"
          readonly={props.readonly}
          label={tGlobal('currency_label')}
          options={CURRENCY_OPTIONS}
          data-testid="ProfileCard.Currency"
        />
        <FormCustomListBox
          value={props.readonly ? props.data?.country : undefined}
          name="country"
          label={tGlobal('country_label')}
          readonly={props.readonly}
          options={COUNTRY_OPTIONS}
          data-testid="ProfileCard.Country"
        />
        <Text keepTextHeight
          theme="error"
          text={props.error}
          data-testid="ProfileCard.Root.Error"
        />
      </VStack>
    </div>
  );
});

const ComposedProfileCard = withLoading({
  loadingComponent: <Loader centered data-testid="ProfileCard" />,
})(ProfileCard);

export { ComposedProfileCard as ProfileCard };
