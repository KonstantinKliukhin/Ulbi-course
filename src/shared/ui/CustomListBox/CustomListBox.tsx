import { Fragment, memo, type ReactNode, useMemo } from 'react';
import { Listbox } from '@headlessui/react';
import { classNames } from 'shared/lib';
import cls from './CustomListBox.module.scss';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { useTranslation } from 'react-i18next';
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/react-dom';

export interface ListBoxItem<Value extends string | number> {
  content: ReactNode;
  value: Value;
  disabled?: boolean;
}

interface CustomListBoxProps<Value extends string | number> {
  className?: string;
  readonly?: boolean;
  options: Array<ListBoxItem<Value>>;
  value?: Value;
  defaultValue?: Value;
  onChange: (value: Value) => void;
  error?: string | null;
  withError?: boolean;
  label?: ReactNode;
}

type CustomListBoxType = <Value extends string | number>(
  props: CustomListBoxProps<Value>
) => ReactNode;

export const CustomListBox = memo<CustomListBoxProps<string | number>>(
  function ListBox (props) {
    const { t, } = useTranslation();
    const { refs, floatingStyles, } = useFloating<HTMLButtonElement>({
      middleware: [flip(), shift(),],
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
    });

    const currentContent = useMemo<ReactNode>(() => {
      const searchValue = props.value ?? props.defaultValue;

      if (searchValue) {
        const currentItem = props.options.find(
          (item) => item.value === searchValue
        );

        return currentItem?.content || t('na');
      } else {
        return t('na');
      }
    }, [props.value, props.defaultValue, props.options, t,]);

    return (
      <>
        <Listbox
          disabled={props.readonly}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          as="div"
          className={classNames(cls.CustomListBox, { [cls.readonly]: props.readonly, }, [props.className,])}
        >
          <Listbox.Label>
            <Text
              size="m"
              text={
                <>
                  {props.label} {'>'}
                </>
              }
            />
          </Listbox.Label>
          <Listbox.Button as="div" ref={refs.setReference}>
            <Button theme="clear" size="m" className={cls.button}>
              {currentContent}
            </Button>
          </Listbox.Button>
          <Listbox.Options className={cls.options}
            ref={refs.setFloating}
            style={floatingStyles}
          >
            {props.options.map((item) => (
              <Listbox.Option
                key={item.value}
                value={item.value}
                as={Fragment}
                disabled={item.disabled}
              >
                {({ selected, active, }) => (
                  <li
                    className={classNames(cls.item, {
                      [cls.selected]: selected,
                      [cls.active]: active && !selected,
                    })}
                  >
                    {item.content}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <Text
          text={props.error}
          size="m"
          theme="error"
          keepTextHeight={props.withError}
        />
      </>
    );
  }
) as CustomListBoxType;
