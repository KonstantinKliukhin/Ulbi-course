import { type CSSProperties, type FC } from 'react';
import cls from './Skeleton.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';

interface SkeletonProps {
  className?: string;
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
  borderRadius?: CSSProperties['borderRadius'];
  centered?: boolean;
}

export const Skeleton: FC<SkeletonProps> = (props) => {
  const style: CSSProperties = {
    height: props.height,
    width: props.width,
    borderRadius: props.borderRadius,
    margin: props.centered ? '0 auto' : undefined,
  };

  return (
    <div
      style={style}
      className={classNames(cls.Skeleton, {}, [props.className,])}
    />
  );
};
