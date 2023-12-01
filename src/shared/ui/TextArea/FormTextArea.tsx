import { type ComponentProps, memo } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { withFormContext } from '../../lib/hocs/withFormContext/withFormContext';
import { separateFormProps } from '../../lib/separateFormProps/separateFormProps';
import { TextArea } from './TextArea';

interface FormTextAreaProps extends UseFormReturn, ComponentProps<typeof TextArea> {
  name: string
}

export const FormTextArea = withFormContext(
  memo<FormTextAreaProps>(function FormTextArea (props) {
    const { formProps, ownProps, } = separateFormProps(props);
    return (
      <TextArea
        {...ownProps}
        error={formProps?.formState?.errors?.[props.name]?.message as string}
        {...formProps?.register?.(ownProps.name)}
      />
    );
  })
);
