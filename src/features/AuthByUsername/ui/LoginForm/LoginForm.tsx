import { type FC } from 'react';
import cls from './LoginForm.module.scss';
import { classNames } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Button, Input } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';

interface LoginFormProps {
  className?: string
}

export const LoginForm: FC<LoginFormProps> = props => {
  const { t, } = useTranslation();
  return (
    <div className={classNames(cls.LoginForm, {}, [props.className,])}>
      <Input placeholder={t('user_name')} className={cls.input} autoFocus/>
      <Input placeholder={t('password')} className={cls.input}/>
      <Button theme={ButtonTheme.OUTLINE} className={cls.loginBtn}>
        {t('login')}
      </Button>
    </div>
  );
};
