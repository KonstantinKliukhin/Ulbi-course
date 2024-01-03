import { type ComponentProps, memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Select } from './Select';

interface FormSelectProps extends ComponentProps<typeof Select> {
  name: string;
}

export const FormSelect = memo<FormSelectProps>(
  function FormSelect (props) {
    const context = useFormContext();

    return (
      <Select
        {...props}
        error={context?.formState?.errors?.[props.name]?.message as string}
        {...context?.register?.(props?.name)}
      />
    );
  }
);
