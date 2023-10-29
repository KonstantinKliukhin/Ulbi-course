import { type FC, useCallback } from 'react';
import cls from './LoginForm.module.scss';
import { classNames, useAppDispatch, useAppSelector } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Button, Input } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';
import { loginActions } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';

interface LoginFormProps {
  className?: string
}

export const LoginForm: FC<LoginFormProps> = props => {
  const dispatch = useAppDispatch();
  const { username, password, error, isLoading, } = useAppSelector(getLoginState);
  const { t, } = useTranslation();

  const onUsernameChange = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch,]);

  const onPasswordChange = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch,]);

  const handleSubmit = useCallback(() => {
    void dispatch(loginByUsername({ username, password, }));
  }, [username, password, dispatch,]);

  return (
    <div className={classNames(cls.LoginForm, {}, [props.className,])}>
      <Text title={t('login_form_title')}/>
      {error
        ? <Text text={t(error)} theme={TextTheme.ERROR} className={cls.error}/>
        : <div className={cls.error}/>
            }
      <Input
        placeholder={t('user_name')}
        className={cls.input}
        value={username}
        onChange={onUsernameChange}
        autoFocus
      />
      <Input
        placeholder={t('password')}
        className={cls.input}
        value={password}
        onChange={onPasswordChange}
      />
      <Button
        disabled={isLoading}
        onClick={handleSubmit}
        theme={ButtonTheme.OUTLINE}
        className={cls.loginBtn}
      >
        {t('login')}
      </Button>
    </div>
  );
};
