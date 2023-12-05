import { memo, type ReactNode, useCallback } from 'react';
import cls from './Tabs.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';
import { HStack } from '../Stack/HStack/HStack';

export interface TabItem<T extends string> {
  value: T
  content: ReactNode
  disabled?: boolean
}

interface TabsProps<T extends string> {
  className?: string
  tabs: Array<TabItem<T>>
  value: T | T[]
  onTabClick: (tab: TabItem<T>) => void
  error?: null | string
  withError?: boolean
  label?: string
}

type TabsComponentType = <T extends string>(props: TabsProps<T>) => ReactNode;

export const Tabs = memo(function Tabs<T extends string> (props: TabsProps<T>) {
  const { onTabClick, } = props;

  const clickHandle = useCallback(
    (tab: TabItem<T>) => () => {
      if (!tab.disabled) {
        onTabClick(tab);
      }
    },
    [onTabClick,]
  );

  const getIsTabSelected = (tabItem: TabItem<T>) => {
    if (Array.isArray(props.value)) {
      return props.value.some((tabValue) => tabValue === tabItem.value);
    } else {
      return props.value === tabItem.value;
    }
  };

  return (
    <>
      {props.label ? <p className={cls.label}>{props.label}</p> : null}
      <HStack
        align="start"
        justify="start"
        xGap={8}
        className={classNames(cls.Tabs, {}, [props.className,])}
      >
        {props.tabs.map((tab) => (
          <Card
            onClick={clickHandle(tab)}
            theme={getIsTabSelected(tab) ? 'default' : 'outlined'}
            className={classNames(cls.tab, {
              [cls.disabledTab]: tab.disabled,
            })}
            key={tab.value}
          >
            {tab.content}
          </Card>
        ))}
      </HStack>
      {props.withError
        ? (
          <Text keepTextHeight theme="error" text={props.error} />
          )
        : null}
    </>
  );
}) as TabsComponentType;
