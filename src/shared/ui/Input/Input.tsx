import {
  type ChangeEvent,
  forwardRef,
  type InputHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import cls from './Input.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { Text } from '../Text/Text';
import { HStack } from '../Stack/HStack/HStack';

type HtmlInputProps = Omit<
InputHTMLAttributes<HTMLInputElement>,
'onChange' | 'value' | 'readOnly'
>;

interface InputProps extends HtmlInputProps {
  value?: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  readonly?: boolean
  error?: string
  noErrorSpace?: boolean
  label: string
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
      noErrorSpace = false,
      ...inputProps
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [caretPosition, setCaretPosition,] = useState(0);
    const mods = {
      [cls.readonly]: readonly,
    };

    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current?.focus();
      }
    }, [autoFocus,]);

    const onSelect = (e: any) => {
      setCaretPosition(e.target.selectionStart || 0);
    };

    const refCb = useCallback(
      (elem: HTMLInputElement) => {
        inputRef.current = elem;

        if (!ref) return;
        if (ref instanceof Function) {
          ref(elem);
        } else {
          ref.current = elem;
        }
      },
      [ref,]
    );

    return (
      <>
        <HStack
          xGap={4}
          align="start"
          className={classNames(cls.InputWrapper, mods, [props.className,])}
        >
          {label ? <div>{`${label} >`}</div> : null}
          <div className={cls.caretWrapper}>
            <input
              {...inputProps}
              aria-invalid={error ? 'true' : 'false'}
              ref={refCb}
              type={type}
              onChange={props.onChange}
              className={cls.input}
              onSelect={onSelect}
              value={value}
              readOnly={readonly}
            />
            <span
              style={{ left: caretPosition * INPUT_FONT_WIDTH, }}
              className={cls.caret}
            />
          </div>
        </HStack>
        {noErrorSpace
          ? null
          : (
            <Text theme="error" keepTextHeight text={error} />
            )}
      </>
    );
  })
);
