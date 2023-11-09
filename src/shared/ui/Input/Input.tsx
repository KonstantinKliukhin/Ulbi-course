import { type ChangeEvent, type InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import cls from './Input.module.scss';
import { classNames } from 'shared/lib';

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'readOnly'>;

interface InputProps extends HtmlInputProps {
  value?: string | number
  onChange?: (value: string) => void
  readonly?: boolean
}

const INPUT_FONT_WIDTH = 9.4;

export const Input = memo<InputProps>(function Input (props) {
  const {
    value,
    onChange,
    className,
    type = 'text',
    placeholder,
    autoFocus,
    readonly,
    ...inputProps
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [caretPosition, setCaretPosition,] = useState(0);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [autoFocus,]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onSelect = (e: any) => {
    setCaretPosition(e.target.selectionStart || 0);
  };

  const mods = {
    [cls.readonly]: readonly,
  };

  return (
    <div className={classNames(cls.InputWrapper, mods, [props.className,])}>
      {placeholder
        ? (<div>{`${placeholder} >`}</div>)
        : null
            }
      <div className={cls.caretWrapper}>
        <input
          {...inputProps}
          ref={inputRef}
          type={type}
          onChange={onChangeHandler}
          className={cls.input}
          onSelect={onSelect}
          value={value}
          readOnly={readonly}
        />
        <span style={{ left: caretPosition * INPUT_FONT_WIDTH, }} className={cls.caret}/>
      </div>
    </div>
  );
});
