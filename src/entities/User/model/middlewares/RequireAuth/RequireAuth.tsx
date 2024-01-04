import { memo, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthorized } from '../../hooks/useIsAuthorized/useIsAuthorized';

interface AuthorizedComponentProps extends PropsWithChildren {
  showIfAuthorized?: boolean;
  showIfNotAuthorized?: boolean;
  redirectPath?: string;
}

export const RequireAuth = memo<AuthorizedComponentProps>(function RequireAuth (props) {
  const { showIfAuthorized = true, showIfNotAuthorized = false, } = props;
  const isAuthorized = useIsAuthorized();

  if (showIfNotAuthorized && !isAuthorized) {
    return props.children;
  } else if (showIfAuthorized && isAuthorized) {
    return props.children;
  } else if (props.redirectPath) {
    return <Navigate to={props.redirectPath} replace/>;
  } else {
    return null;
  }
});
