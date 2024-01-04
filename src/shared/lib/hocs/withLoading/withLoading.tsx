import { type FC, type ReactNode } from 'react';
import { Loader } from '../../../ui/Loader/Loader';
import { useAppSelector } from '../../hooks/reduxHooks/useAppSelector';

export interface WithLoadingProps {
  isLoading?: boolean;
}

export interface WithLoadingOptions {
  loadingComponent?: ReactNode;
  loadingSelector?: (state: StateSchema) => boolean;
}

export const withLoading =
  (options?: WithLoadingOptions) =>
  <Props extends WithLoadingProps>(WrappedComponent: FC<Props>): FC<Props> => {
    const displayName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const loadingComponent = options?.loadingComponent ?? <Loader centered />;

    const ReturnComponent: FC<Props> = (props) => {
      const isLoading = useAppSelector(
        options?.loadingSelector ?? (() => props.isLoading)
      );
      if (isLoading) {
        return loadingComponent;
      } else {
        return <WrappedComponent {...props} />;
      }
    };

    ReturnComponent.displayName = `withLoading(${displayName})`;

    return ReturnComponent;
  };
