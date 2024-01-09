import cls from './Flex.module.scss';
import { classNames } from '@/shared/lib';
import { type HTMLAttributes, memo, type PropsWithChildren } from 'react';

type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
type FlexDirection = 'column' | 'row';
type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
type FlexGap = 4 | 8 | 16 | 32;

interface FlexProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  className?: string;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  xGap?: FlexGap;
  yGap?: FlexGap;
  as?: 'div' | 'header' | 'main' | 'aside';
}

const justifyClasses: Record<FlexJustify, keyof typeof cls> = {
  start: 'justifyStart',
  center: 'justifyCenter',
  end: 'justifyEnd',
  between: 'justifyBetween',
  around: 'justifyAround',
};

const alignClasses: Record<FlexAlign, keyof typeof cls> = {
  start: 'alignStart',
  center: 'alignCenter',
  end: 'alignEnd',
  stretch: 'alignStretch',
};

const directionClasses: Record<FlexDirection, keyof typeof cls> = {
  row: 'directionRow',
  column: 'directionColumn',
};

const xGapClasses: Record<FlexGap, keyof typeof cls> = {
  4: 'xGap4',
  8: 'xGap8',
  16: 'xGap16',
  32: 'xGap32',
};

const yGapClasses: Record<FlexGap, keyof typeof cls> = {
  4: 'yGap4',
  8: 'yGap8',
  16: 'yGap16',
  32: 'yGap32',
};

export const Flex = memo<FlexProps>(function Flex (props) {
  const {
    justify = 'start',
    align = 'center',
    direction = 'row',
    xGap,
    yGap,
    className,
    as: Component = 'div',
    ...divProps
  } = props;

  return (
    <Component
      {...divProps}
      className={classNames(cls.Flex, {}, [
        className,
        cls[justifyClasses[justify]],
        cls[alignClasses[align]],
        cls[directionClasses[direction]],
        xGap ? cls[xGapClasses[xGap]] : '',
        yGap ? cls[yGapClasses[yGap]] : '',
      ])}
    >
      {props.children}
    </Component>
  );
});
