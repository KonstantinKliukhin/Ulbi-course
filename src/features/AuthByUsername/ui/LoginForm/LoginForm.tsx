import { type FC, useCallback } from 'react';
import cls from './LoginForm.module.scss';
import { classNames, useAppDispatch, useAppSelector, withLazySlice } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Button, Input } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';

interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const LoginForm: FC<LoginFormProps> = props => {
  const { onSuccess, } = props;
  const dispatch = useAppDispatch();
  const username = useAppSelector(getLoginUsername);
  const password = useAppSelector(getLoginPassword);
  const error = useAppSelector(getLoginError);
  const isLoading = useAppSelector(getLoginIsLoading);

  const { t, } = useTranslation();

  const onUsernameChange = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch,]);

  const onPasswordChange = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch,]);

  const handleSubmit = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password, }));

    const isSuccess = result.meta.requestStatus === 'fulfilled';

    if (isSuccess) onSuccess();
  }, [username, password, dispatch, onSuccess,]);

  return (
    <div className={classNames(cls.LoginForm, {}, [props.className,])}>
      <Text title={t('login_form_title')}/>
      {error
        ? <Text text={error} theme={TextTheme.ERROR} className={cls.error}/>
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

export default withLazySlice(LoginForm, { name: 'loginForm', reducer: loginReducer, });
