import { type FC, type PropsWithChildren } from 'react';
import { useIsAuthorized } from '../../hooks/useIsAuthorized/useIsAuthorized';
import { Navigate } from 'react-router-dom';

interface AuthorizedComponentProps extends PropsWithChildren {
  ifAuthorized?: boolean
  ifNotAuthorized?: boolean
  redirectPath?: string
}

export const AuthorizedComponent: FC<AuthorizedComponentProps> = props => {
  const { ifAuthorized = true, ifNotAuthorized = false, } = props;
  const isAuthorized = useIsAuthorized();

  if (ifNotAuthorized && !isAuthorized) {
    return props.children;
  } else if (ifAuthorized && isAuthorized) {
    return props.children;
  } else if (props.redirectPath) {
    return <Navigate to={props.redirectPath}/>;
  } else {
    return null;
  }
};
