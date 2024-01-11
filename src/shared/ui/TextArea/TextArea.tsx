import {
  type ChangeEvent,
  type CSSProperties,
  forwardRef,
  type InputHTMLAttributes,
  memo,
  type ReactNode,
  useEffect, useId,
  useMemo,
  useRef
} from 'react';
import { classNames } from '../../lib/ui/classNames/classNames';
import cls from './TextArea.module.scss';
import { Text } from '../Text/Text';
import { VStack } from '../Stack/VStack/VStack';
import { useCombinedRefs } from '../../lib/utils/useCombinedRefs/useCombinedRefs';

type HtmlTextAreaProps = Omit<
InputHTMLAttributes<HTMLTextAreaElement>,
'onChange' | 'value' | 'readOnly'
>;

interface TextAreaProps extends HtmlTextAreaProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean;
  error?: string;
  resize?: CSSProperties['resize'];
  label?: ReactNode;
  textAreaClassName?: string;
}

export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea (props, ref) {
    const {
      value,
      onChange,
      className,
      label,
      autoFocus,
      readonly,
      error,
      resize,
      style,
      textAreaClassName,
      ...inputProps
    } = props;
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const generatedId = useId();
    const textAreaId = inputProps.id ?? generatedId;

    useEffect(() => {
      if (autoFocus && textAreaRef.current) {
        textAreaRef.current?.focus();
      }
    }, [autoFocus,]);

    const refCb = useCombinedRefs(textAreaRef, ref);

    const textareaStyle = useMemo<CSSProperties>(
      () => ({ ...style, resize, }),
      [resize, style,]
    );

    const labelProps = useMemo(() => ({
      htmlFor: textAreaId,
    }), [textAreaId,]);

    return (
      <VStack
        yGap={4}
        align="start"
        className={classNames(cls.TextArea, { [cls.readonly]: readonly, }, [props.className,])}
      >
        {label ? <Text labelProps={labelProps} textTag="label" text={label} /> : null}
        <textarea
          {...inputProps}
          id={textAreaId}
          style={textareaStyle}
          aria-invalid={error ? 'true' : 'false'}
          ref={refCb}
          onChange={props.onChange}
          className={classNames(cls.textarea, {}, [textAreaClassName,])}
          value={value}
          readOnly={readonly}
        />
        <Text
          className={cls.error}
          size="s"
          theme="error"
          text={error}
        />
      </VStack>
    );
  })
);
