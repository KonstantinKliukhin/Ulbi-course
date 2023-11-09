import { type ComponentProps, type FC } from 'react';
import { AuthorizedComponent } from '../AuthorizedComponent/AuthorizedComponent';

type WithAuthorizationOptions = ComponentProps<typeof AuthorizedComponent>;

export const withAuthorization =
    <Props extends Record<string, any>>(
    WrappedComponent: FC<Props>,
    options: WithAuthorizationOptions
  ) => {
      const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

      const ReturnComponent: FC<Props> = props => {
        return (
          <AuthorizedComponent {...options}>
            <WrappedComponent {...props} />
          </AuthorizedComponent>
        );
      };

      ReturnComponent.displayName = `withAuthorization(${displayName})`;
    };
