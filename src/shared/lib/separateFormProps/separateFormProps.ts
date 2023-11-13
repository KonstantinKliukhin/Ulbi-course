import { type UseFormReturn } from 'react-hook-form';

export const separateFormProps = <T extends UseFormReturn>(props: T): {
  formProps: UseFormReturn
  ownProps: Omit<T, keyof UseFormReturn>
} => {
  const {
    register,
    formState,
    getFieldState,
    control,
    clearErrors,
    watch,
    getValues,
    setError,
    setValue,
    setFocus,
    trigger,
    resetField,
    handleSubmit,
    unregister,
    reset,
    ...ownProps
  } = props;

  return {
    formProps: {
      register,
      formState,
      getFieldState,
      control,
      clearErrors,
      watch,
      getValues,
      setError,
      setValue,
      setFocus,
      trigger,
      resetField,
      handleSubmit,
      unregister,
      reset,
    },
    ownProps,
  };
};
