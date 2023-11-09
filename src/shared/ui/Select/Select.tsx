import { type ChangeEvent, memo, type ReactNode, useMemo } from 'react';
import cls from './Select.module.scss';
import { classNames } from 'shared/lib';

export interface SelectOption<Value extends string | number> {
  value: Value
  content: ReactNode
}

interface SelectProps<Value extends string | number> {
  className?: string
  label?: string
  options?: Array<SelectOption<Value>>
  value?: string
  onChange?: (value: Value) => void
  readonly?: boolean
}

type SelectType = <Value extends string | number>(props: SelectProps<Value>) => ReactNode;

export const Select: SelectType =
    memo(function Select (props) {
      const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        // @ts-expect-error "Value" generic can't be used here and common usage of generic is impossible
        props.onChange?.(e.target.value);
      };

      const optionList = useMemo(() => (
        props.options?.map(option => (
          <option key={option.value} value={option.value} className={cls.option}>
            {option.content}
          </option>
        ))
      ), [props.options,]);

      const mods = {
        [cls.readonly]: props.readonly,
      };

      return (
        <div className={classNames(cls.Wrapper, mods, [props.className,])}>
          {props.label
            ? (
              <span className={cls.label}>
                {`${props.label} >`}
              </span>
              )
            : null
                }
          <select
            disabled={props.readonly}
            value={props.value}
            className={cls.select}
            onChange={onChangeHandler}
          >
            {optionList}
          </select>

        </div>
      );
    });
