import { type FC, type ReactNode } from 'react';
import { Loader } from '../../../ui/Loader/Loader';

export interface WithLoadingProps {
  isLoading?: boolean
}

interface WithLoadingOptions {
  LoadingComponent?: ReactNode
}

export const withLoading = <Props extends WithLoadingProps>
  (WrappedComponent: FC<Props>, options?: WithLoadingOptions) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  const LoadingComponent = options?.LoadingComponent ?? <Loader centered/>;

  const ReturnComponent: FC<Props> = (props) => {
    if (props.isLoading) {
      return LoadingComponent;
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  ReturnComponent.displayName = `withLoading(${displayName})`;

  return ReturnComponent;
};
