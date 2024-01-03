import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'shared/lib';
import { validateLoginData } from '../../validation/validateLoginData/validateLoginData';

export const useLoginForm = () => {
  const loginFormResolver = useYupValidationResolver(validateLoginData);

  return useForm({
    mode: 'onChange',
    delayError: 150,
    resolver: loginFormResolver,
  });
};
