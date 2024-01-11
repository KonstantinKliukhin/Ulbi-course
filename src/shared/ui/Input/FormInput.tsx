import { type ComponentProps, memo, useId } from 'react';
import { Input } from './Input';
import { useFormContext } from 'react-hook-form';

interface FormInputProps extends ComponentProps<typeof Input> {
  name: string;
}

export const FormInput = memo<FormInputProps>(function FormInput (props) {
  const context = useFormContext();
  const inputWithValueId = useId();
  const inputWithoutValueId = useId();

  if (props.value !== undefined) {
    return <Input {...props} key={inputWithValueId} />;
  } else {
    return (
      <Input
        {...props}
        key={inputWithoutValueId}
        error={context?.formState?.errors?.[props.name]?.message as string}
        {...context?.register?.(props.name)}
      />
    );
  }
});
