import { type FC, useCallback } from 'react';
import cls from './LoginForm.module.scss';
import {
  classNames,
  useAppDispatch,
  useAppSelector,
  withLazySlices
} from '@/shared/lib';
import { useTranslation } from 'react-i18next';
import { Button, FormInput, Text, VStack } from '@/shared/ui';
import { loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { useLoginForm } from '../../model/hooks/useLoginForm/useLoginForm';
import { FormProvider } from 'react-hook-form';

interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const { onSuccess, } = props;
  const dispatch = useAppDispatch();
  const error = useAppSelector(getLoginError);
  const isLoading = useAppSelector(getLoginIsLoading);
  const { t, } = useTranslation();

  const loginForm = useLoginForm();
  const { handleSubmit, } = loginForm;

  const onSubmit = handleSubmit(
    useCallback(
      async (values) => {
        const result = await dispatch(loginByUsername(values));

        const isSuccess = result.meta.requestStatus === 'fulfilled';

        if (isSuccess) onSuccess();
      },
      [dispatch, onSuccess,]
    )
  );

  return (
    <FormProvider {...loginForm}>
      <form
        onSubmit={onSubmit}
        className={classNames(cls.LoginForm, {}, [props.className,])}
      >
        <VStack align="start">
          <Text title={t('login_form_title')} />
          <Text
            text={error}
            keepTextHeight
            theme="error"
            className={cls.error}
          />
          <FormInput
            disabled={isLoading}
            name="username"
            label={t('user_name')}
            className={cls.input}
            autoFocus
          />
          <FormInput
            disabled={isLoading}
            name="password"
            label={t('password')}
            className={cls.input}
          />
          <Button
            disabled={isLoading || !loginForm.formState.isValid}
            onClick={onSubmit}
            theme="outline"
            className={cls.loginBtn}
          >
            {t('login')}
          </Button>
        </VStack>
      </form>
    </FormProvider>
  );
};

export default withLazySlices({ reducers: { loginForm: loginReducer, }, })(
  LoginForm
);
