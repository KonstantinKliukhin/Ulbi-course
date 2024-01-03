import { type ComponentProps, memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextArea } from './TextArea';

interface FormTextAreaProps extends ComponentProps<typeof TextArea> {
  name: string;
}

export const FormTextArea = memo<FormTextAreaProps>(function FormTextArea (props) {
  const context = useFormContext();

  return (
    <TextArea
      {...props}
      error={context?.formState?.errors?.[props.name]?.message as string}
      {...context?.register?.(props.name)}
    />
  );
});
