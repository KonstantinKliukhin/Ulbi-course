import { type FC, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthorized } from 'entities/User';

interface AuthorizedComponentProps extends PropsWithChildren {
  showIfAuthorized?: boolean
  showIfNotAuthorized?: boolean
  redirectPath?: string
}

export const AuthorizedComponent: FC<AuthorizedComponentProps> = props => {
  const { showIfAuthorized = true, showIfNotAuthorized = false, } = props;
  const isAuthorized = useIsAuthorized();

  if (showIfNotAuthorized && !isAuthorized) {
    return props.children;
  } else if (showIfAuthorized && isAuthorized) {
    return props.children;
  } else if (props.redirectPath) {
    return <Navigate to={props.redirectPath}/>;
  } else {
    return null;
  }
};
