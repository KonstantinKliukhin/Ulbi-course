import { type ComponentProps, memo } from 'react';
import { Input } from './Input';
import { useFormContext } from 'react-hook-form';

interface FormInputProps extends ComponentProps<typeof Input> {
  name: string;
}

export const FormInput = memo<FormInputProps>(function FormInput (props) {
  const context = useFormContext();

  return (
    <Input
      {...props}
      error={context?.formState?.errors?.[props.name]?.message as string}
      {...context?.register?.(props.name)}
    />
  );
});
