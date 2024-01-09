import {
  type ChangeEvent,
  type CSSProperties,
  forwardRef,
  type InputHTMLAttributes,
  memo,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { classNames } from '../../lib/ui/classNames/classNames';
import cls from './TextArea.module.scss';
import { Text } from '../Text/Text';
import { VStack } from '../Stack/VStack/VStack';

type HtmlTextAreaProps = Omit<
InputHTMLAttributes<HTMLTextAreaElement>,
'onChange' | 'value' | 'readOnly'
>;

interface TextAreaProps extends HtmlTextAreaProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean;
  error?: string;
  withError?: boolean;
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
      withError = false,
      resize,
      style,
      textAreaClassName,
      ...inputProps
    } = props;

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const mods = {
      [cls.readonly]: readonly,
    };

    useEffect(() => {
      if (autoFocus && textAreaRef.current) {
        textAreaRef.current?.focus();
      }
    }, [autoFocus,]);

    const refCb = useCallback(
      (elem: HTMLTextAreaElement) => {
        textAreaRef.current = elem;

        if (!ref) return;
        if (ref instanceof Function) {
          ref(elem);
        } else {
          ref.current = elem;
        }
      },
      [ref,]
    );

    const textareaStyle = useMemo<CSSProperties>(
      () => ({
        ...style,
        resize,
      }),
      [resize, style,]
    );

    return (
      <>
        <VStack
          yGap={4}
          align="start"
          className={classNames('', mods, [props.className,])}
        >
          {label ? <div>{label}</div> : null}
          <textarea
            {...inputProps}
            style={textareaStyle}
            aria-invalid={error ? 'true' : 'false'}
            ref={refCb}
            onChange={props.onChange}
            className={classNames(cls.textarea, {}, [textAreaClassName,])}
            value={value}
            readOnly={readonly}
          />
          {withError
            ? (
              <Text theme="error" keepTextHeight text={error} />
              )
            : null}
        </VStack>
      </>
    );
  })
);
