import { type FC } from 'react';
import cls from './PageLoader.module.scss';
import { classNames } from 'shared/lib';
import { HStack, Loader } from 'shared/ui';

interface PageLoaderProps {
  className?: string
}

export const PageLoader: FC<PageLoaderProps> = (props) => {
  return (
    <HStack
      align="center"
      justify="center"
      className={classNames(cls.PageLoader, {}, [props.className,])}
    >
      <Loader />
    </HStack>
  );
};
