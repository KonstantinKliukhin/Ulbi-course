import { type ChangeEvent, forwardRef, memo, type ReactNode, type SelectHTMLAttributes, useMemo } from 'react';
import cls from './Select.module.scss';
import { classNames } from 'shared/lib';
import { Text, TextTheme } from '../Text/Text';

export interface SelectOption<Value extends string | number> {
  value: Value
  content: ReactNode
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
  label?: string
  options?: Array<SelectOption<string | number>>
  value?: string
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  readonly?: boolean
  error?: string
}

export const Select =
    memo(forwardRef<HTMLSelectElement, SelectProps>(function Select (props, selectRef) {
      const {
        options,
        label,
        className,
        readonly,
        error,
        ...selectProps
      } = props;

      const optionList = useMemo(() => (
        options?.map(option => (
          <option key={option.value} value={option.value} className={cls.option}>
            {option.content}
          </option>
        ))
      ), [options,]);

      const mods = {
        [cls.readonly]: readonly,
      };

      return (
        <>
          <div className={classNames(cls.Wrapper, mods, [props.className,])}>
            {props.label
              ? (
                <span className={cls.label}>
                  {`${label} >`}
                </span>
                )
              : null
                    }
            <select
              {...selectProps}
              aria-invalid={error ? 'true' : 'false'}
              disabled={readonly || selectProps.disabled}
              className={cls.select}
              ref={selectRef}
            >
              {optionList}
            </select>
          </div>
          <Text theme={TextTheme.ERROR} className={cls.error} text={props.error}/>
        </>
      );
    }));
