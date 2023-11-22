import { type FC, type HTMLAttributes, type PropsWithChildren, useMemo } from 'react';
import cls from './Card.module.scss';
import { classNames } from 'shared/lib';

export enum CardHoverAnimation {
  SHADOW = 'hover-shadow',
  SCALE_SMALL = 'hover-scale-small'
}

export enum CardTheme {
  DEFAULT = 'default',
  OUTLINED = 'outlined'
}

interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  className?: string
  hoverAnimations?: CardHoverAnimation[]
  theme?: CardTheme
}

export const Card: FC<CardProps> = props => {
  const {
    className,
    theme = CardTheme.DEFAULT,
    hoverAnimations,
    ...divProps
  } = props;

  const hoverAnimationsClasses = useMemo(() => (
    hoverAnimations?.map(animation => cls[animation]) ?? []
  ), [hoverAnimations,]);

  return (
    <div
      {...divProps}
      className={classNames(
        cls.Card,
        {},
        [className, cls[theme], ...hoverAnimationsClasses,]
      )}
    >
      {props.children}
    </div>
  );
};
