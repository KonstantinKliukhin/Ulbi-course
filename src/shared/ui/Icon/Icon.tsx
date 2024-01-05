import React, { type FC } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Icon.module.scss';

type IconTheme = 'primary' | 'inverted';

interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  theme?: IconTheme;
}

const mapIconThemeToClass: Record<IconTheme, string> = {
  primary: 'primary',
  inverted: 'inverted',
};

export const Icon: FC<IconProps> = (props) => {
  const { className, Svg, theme = 'primary', ...svgProps } = props;

  return (
    <Svg
      {...svgProps}
      className={classNames(
        cls.Icon,
        {},
        [className, cls[mapIconThemeToClass[theme]],]
      )}
    />
  );
};
