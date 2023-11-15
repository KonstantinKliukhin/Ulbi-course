import React, { type FC } from 'react';
import { classNames } from 'shared/lib';
import cls from './Icon.module.scss';

interface IconProps {
  className?: string
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

export const Icon: FC<IconProps> = props => {
  return (
    <props.Svg className={classNames(cls.Icon, {}, [props.className,])}/>
  );
};
