import React, { type FC } from 'react';
import { classNames } from 'shared/lib';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

export const Icon: FC<IconProps> = props => {
  const { className, Svg, ...svgProps } = props;
  return (
    <Svg {...svgProps} className={classNames(cls.Icon, {}, [className,])}/>
  );
};
