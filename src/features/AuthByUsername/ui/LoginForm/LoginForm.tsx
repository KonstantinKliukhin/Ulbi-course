import { type FC, useCallback } from 'react';
import cls from './LoginForm.module.scss';
import { classNames, useAppDispatch, useAppSelector, withLazySlices } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme, FormInput, Text, TextTheme } from 'shared/ui';
import { loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { useLoginForm } from '../../model/hooks/useLoginForm/useLoginForm';
import { FormProvider } from 'react-hook-form';

interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const LoginForm: FC<LoginFormProps> = props => {
  const { onSuccess, } = props;
  const dispatch = useAppDispatch();
  const error = useAppSelector(getLoginError);
  const isLoading = useAppSelector(getLoginIsLoading);
  const { t, } = useTranslation();

  const loginForm = useLoginForm();
  const { handleSubmit, } = loginForm;

  const onSubmit = useCallback(handleSubmit(async (values) => {
    const result = await dispatch(loginByUsername(values));

    const isSuccess = result.meta.requestStatus === 'fulfilled';

    if (isSuccess) onSuccess();
  }), [dispatch, onSuccess, handleSubmit,]);

  return (
    <FormProvider {...loginForm}>
      <form
        onSubmit={onSubmit}
        className={classNames(cls.LoginForm, {}, [props.className,])}
      >
        <Text title={t('login_form_title')}/>
        {error
          ? <Text text={error} theme={TextTheme.ERROR} className={cls.error}/>
          : <div className={cls.error}/>
                }
        <FormInput
          name="username"
          placeholder={t('user_name')}
          className={cls.input}
          autoFocus
        />
        <FormInput
          name="password"
          placeholder={t('password')}
          className={cls.input}
        />
        <Button
          disabled={isLoading}
          onClick={onSubmit}
          theme={ButtonTheme.OUTLINE}
          className={cls.loginBtn}
        >
          {t('login')}
        </Button>
      </form>
    </FormProvider>
  );
};

export default withLazySlices(LoginForm, { reducers: { loginForm: loginReducer, }, });
