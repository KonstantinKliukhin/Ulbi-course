import { type ComponentProps, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomListBox } from './CustomListBox';
import { mockFn } from '@/shared/lib';

type CustomListBoxProps = Omit<
ComponentProps<typeof CustomListBox<string | number>>,
'onChange'
>;

interface FormCustomListBoxProps extends CustomListBoxProps {
  className?: string;
  name: string;
}

export const FormCustomListBox =
  memo<FormCustomListBoxProps>(function FormCustomListBox (props) {
    const context = useFormContext();

    if (context && !props.value) {
      return (
        <Controller
          name={props.name}
          defaultValue={props.defaultValue}
          control={context.control}
          render={({ field, }) => (
            <CustomListBox
              {...props}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      );
    } else {
      return <CustomListBox onChange={mockFn} {...props} />;
    }
  });
