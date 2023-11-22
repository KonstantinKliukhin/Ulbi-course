import { memo, type ReactNode, useCallback } from 'react';
import cls from './Tabs.module.scss';
import { classNames } from 'shared/lib';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem<T extends string> {
  value: T
  content: ReactNode
  disabled?: boolean
}

interface TabsProps<T extends string> {
  className?: string
  tabs: Array<TabItem<T>>
  value: string
  onTabClick: (tab: TabItem<T>) => void
}

type TabsComponentType = <T extends string>(props: TabsProps<T>) => ReactNode;

export const Tabs = memo(function Tabs<T extends string>
(props: TabsProps<T>) {
  const { onTabClick, } = props;

  const clickHandle = useCallback((tab: TabItem<T>) => () => {
    if (!tab.disabled) {
      onTabClick(tab);
    }
  }, [onTabClick,]);

  return (
    <div className={classNames(cls.Tabs, {}, [props.className,])}>
      {props.tabs.map((tab) => (
        <Card
          onClick={clickHandle(tab)}
          theme={tab.value === props.value ? CardTheme.DEFAULT : CardTheme.OUTLINED}
          className={classNames(
            cls.tab,
            {
              [cls.disabledTab]: tab.disabled,
            })
                        }
          key={tab.value}
        >
          {tab.content}
        </Card>
      )
      )}
    </div>
  );
}) as TabsComponentType;
