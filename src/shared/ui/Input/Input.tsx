import { type ChangeEvent, type FC, type InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import cls from './Input.module.scss';

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

interface InputProps extends HtmlInputProps {
  value?: string
  onChange?: (value: string) => void
}

const INPUT_FONT_WIDTH = 7.2;

export const Input: FC<InputProps> = memo(function Input (props) {
  const {
    value,
    onChange,
    className,
    type = 'text',
    placeholder,
    autoFocus,
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

  return (
    <div className={cls.InputWrapper}>
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
                />
        <span style={{ left: caretPosition * INPUT_FONT_WIDTH, }} className={cls.caret}/>
      </div>
    </div>
  );
});
