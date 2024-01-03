import { memo, type PropsWithChildren, type ReactNode } from 'react';
import { Loader } from '../Loader/Loader';
import { Text } from '../Text/Text';

interface AsyncContainerProps extends PropsWithChildren {
  isLoading?: boolean;
  error?: string | null;
  errorNode?: ReactNode;
  loadingNode?: ReactNode;
}

export const AsyncContainer = memo<AsyncContainerProps>(function AsyncContainer (props) {
  if (props.isLoading) {
    return props.loadingNode ?? <Loader centered />;
  } else if (props.error) {
    return props.errorNode ?? <Text title={props.error} align="center" theme="error" />;
  } else {
    return props.children;
  }
});
