import { type ComponentProps, type FC } from 'react';
import { RequireAuth } from '../RequireAuth/RequireAuth';

type WithAuthorizationOptions = ComponentProps<typeof RequireAuth>;

export const withRequireAuth =
    <Props extends Record<string, any>>(
    WrappedComponent: FC<Props>,
    options: WithAuthorizationOptions
  ) => {
      const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

      const ReturnComponent: FC<Props> = props => {
        return (
          <RequireAuth {...options}>
            <WrappedComponent {...props} />
          </RequireAuth>
        );
      };

      ReturnComponent.displayName = `withRequireAuth(${displayName})`;
    };
