import {
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
  useMemo
} from 'react';
import cls from './Card.module.scss';
import { classNames } from '../../lib/classNames/classNames';

type CardHoverAnimation = 'hover-shadow' | 'hover-scale-small';

type CardTheme = 'default' | 'outlined';

interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  className?: string;
  hoverAnimations?: CardHoverAnimation[];
  theme?: CardTheme;
}

const mapCardHoverAnimationClasses: Record<
CardHoverAnimation,
keyof typeof cls
> = {
  'hover-shadow': 'hoverShadow',
  'hover-scale-small': 'hoverScaleSmall',
};

const mapCardThemeClasses: Record<CardTheme, keyof typeof cls> = {
  default: 'default',
  outlined: 'outlined',
};

export const Card: FC<CardProps> = (props) => {
  const { className, theme = 'default', hoverAnimations, ...divProps } = props;

  const hoverAnimationsClasses = useMemo(
    () =>
      hoverAnimations?.map(
        (animation) => cls[mapCardHoverAnimationClasses[animation]]
      ) ?? [],
    [hoverAnimations,]
  );

  return (
    <div
      {...divProps}
      className={classNames(cls.Card, {}, [
        className,
        cls[mapCardThemeClasses[theme]],
        ...hoverAnimationsClasses,
      ])}
    >
      {props.children}
    </div>
  );
};
