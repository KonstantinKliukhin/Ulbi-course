import { type ComponentProps, memo } from 'react';
import { Input } from './Input';
import { type UseFormReturn } from 'react-hook-form';
import { withFormContext } from '../../lib/hocs/withFormContext/withFormContext';
import { separateFormProps } from '../../lib/separateFormProps/separateFormProps';

interface FormInputProps extends UseFormReturn, ComponentProps<typeof Input> {
  name: string
}

export const FormInput = withFormContext(
  memo<FormInputProps>(function FormInput (props) {
    const { formProps, ownProps, } = separateFormProps(props);
    return (
      <Input
        {...ownProps}
        error={formProps?.formState?.errors?.[props.name]?.message as string}
        {...formProps?.register?.(ownProps.name)}
      />
    );
  })
);
