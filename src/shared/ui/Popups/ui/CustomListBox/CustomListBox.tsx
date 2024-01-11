import { Fragment, memo, type ReactNode, useMemo } from 'react';
import { Listbox } from '@headlessui/react';
import { classNames } from '../../../../lib/ui/classNames/classNames';
import cls from './CustomListBox.module.scss';
import popupCls from '../../styles/Popup.module.scss';
import { Text } from '../../../Text/Text';
import { useTranslation } from 'react-i18next';
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/react-dom';
import { HStack } from '../../../Stack/HStack/HStack';

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
  label?: ReactNode;
  'data-testid'?: string;
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
      <div
        className={classNames(
          cls.CustomListBox,
          { [cls.readonly]: props.readonly, },
          [props.className,]
        )}
      >
        <Listbox
          disabled={props.readonly}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          as={HStack}
          xGap={4}
          align="center"
          className={classNames('', { [cls.readonly]: props.readonly, }, [props.className,])}
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
          <Listbox.Button
            className={classNames(popupCls.btn, {}, [cls.button,])}
            ref={refs.setReference}
            data-testid={`${props['data-testid']}.CustomListBox.Value`}
          >
            {currentContent}
          </Listbox.Button>
          <Listbox.Options className={popupCls.menu}
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
                      [popupCls.itemActive]: active && !selected,
                    }, [popupCls.item,])}
                  >
                    {item.content}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <Text
          className={cls.error}
          data-testid={`${props['data-testid']}.CustomListBox.Error`}
          text={props.error}
          size="s"
          theme="error"
        />
      </div>
    );
  }
) as CustomListBoxType;
