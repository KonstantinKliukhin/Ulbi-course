import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'shared/lib';
import { getLoginValidationErrors } from '../../validation/getLoginValidationErrors/getLoginValidationErrors';

export const useLoginForm = () => {
  const loginFormResolver = useYupValidationResolver(getLoginValidationErrors);
  return useForm({ mode: 'onChange', delayError: 150, resolver: loginFormResolver, });
};
