import { type ComponentProps, memo, useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextArea } from './TextArea';

interface FormTextAreaProps extends ComponentProps<typeof TextArea> {
  name: string;
}

export const FormTextArea = memo<FormTextAreaProps>(function FormTextArea (props) {
  const context = useFormContext();
  const inputWithValueId = useId();
  const inputWithoutValueId = useId();

  if (props.value !== undefined) {
    return <TextArea key={inputWithValueId} {...props}/>;
  } else {
    return (
      <TextArea
        {...props}
        key={inputWithoutValueId}
        error={context?.formState?.errors?.[props.name]?.message as string}
        {...context?.register?.(props.name)}
      />
    );
  }
});
