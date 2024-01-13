import {
  type ChangeEvent,
  forwardRef,
  type InputHTMLAttributes,
  memo,
  useEffect, useId, useMemo,
  useRef,
  useState
} from 'react';
import cls from './Input.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import { Text } from '../Text/Text';
import { HStack } from '../Stack/HStack/HStack';
import { useCombinedRefs } from '../../lib/utils/useCombinedRefs/useCombinedRefs';
import { type TestProps } from '../../types/testProps';

type HtmlInputProps = Omit<
InputHTMLAttributes<HTMLInputElement>,
'onChange' | 'value' | 'readOnly'
>;

interface InputProps extends HtmlInputProps, TestProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  error?: string;
  label: string;
}

const INPUT_FONT_WIDTH = 9.4;

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input (props, ref) {
    const {
      value,
      onChange,
      className,
      type = 'text',
      label,
      autoFocus,
      readonly,
      error,
      'data-testid': dataTestId,
      ...inputProps
    } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const refCb = useCombinedRefs(inputRef, ref);
    const [caretPosition, setCaretPosition,] = useState(0);
    const generatedId = useId();
    const inputId = inputProps.id ?? generatedId;
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current?.focus();
      }
    }, [autoFocus,]);

    const onSelect = (e: any) => {
      setCaretPosition(e.target.selectionStart || 0);
    };

    const labelProps = useMemo(() => ({
      htmlFor: inputId,
    }), [inputId,]);

    return (
      <HStack
        xGap={4}
        align="start"
        className={classNames(cls.InputWrapper, { [cls.readonly]: readonly, }, [props.className,])}
      >
        {label ? <Text textTag="label" labelProps={labelProps} text={`${label} >`}/> : null}
        <div className={cls.caretWrapper}>
          <input
            {...inputProps}
            id={inputId}
            aria-invalid={error ? 'true' : 'false'}
            ref={refCb}
            type={type}
            onChange={props.onChange}
            className={cls.input}
            onSelect={onSelect}
            value={value}
            readOnly={readonly}
            data-testid={`${dataTestId}.Input.Value`}
          />
          <span
            style={{ left: caretPosition * INPUT_FONT_WIDTH, }}
            className={cls.caret}
          />
        </div>
        <Text
          className={cls.error}
          size="s"
          data-testid={`${dataTestId}.Input.Error`}
          theme="error"
          text={error}
        />
      </HStack>
    );
  })
);
