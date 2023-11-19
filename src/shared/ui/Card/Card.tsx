import { type FC, type HTMLAttributes, type PropsWithChildren, useMemo } from 'react';
import cls from './Card.module.scss';
import { classNames } from 'shared/lib';

export enum CardHoverAnimation {
  SHADOW = 'hover-shadow',
  SCALE_SMALL = 'hover-scale-small'
}

interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  className?: string
  hoverAnimations?: CardHoverAnimation[]
}

export const Card: FC<CardProps> = props => {
  const { className, hoverAnimations, ...divProps } = props;

  const hoverAnimationsClasses = useMemo(() => (
    hoverAnimations?.map(animation => cls[animation]) ?? []
  ), [hoverAnimations,]);

  return (
    <div {...divProps} className={classNames(cls.Card, {}, [className, ...hoverAnimationsClasses,])}>
      {props.children}
    </div>
  );
};
