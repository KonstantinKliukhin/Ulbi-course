import { type ComponentProps, memo } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { Select } from './Select';
import { withFormContext } from '../../lib/hocs/withFormContext/withFormContext';
import { separateFormProps } from '../../lib/separateFormProps/separateFormProps';

interface FormSelectProps extends UseFormReturn, ComponentProps<typeof Select> {
  name: string
}

export const FormSelect = withFormContext(memo<FormSelectProps>(
  function FormSelect (props) {
    const { formProps, ownProps, } = separateFormProps(props);

    return (
      <Select
        {...ownProps}
        error={formProps?.formState?.errors?.[ownProps.name]?.message as string}
        {...formProps?.register?.(ownProps?.name)}
      />
    );
  }
));
