import { memo, type PropsWithChildren, useMemo } from 'react';
import { useAppSelector } from 'shared/lib';
import { getUserRoles } from '../../selectors/getUserRoles/getUserRoles';
import { type UserRole } from '../../types/user';
import { Navigate } from 'react-router-dom';

interface RequireRolesProps extends PropsWithChildren {
  roles: UserRole[];
  redirectPath?: string;
}

export const RequireRoles = memo<RequireRolesProps>(function RequireRoles (props) {
  const userRoles = useAppSelector(getUserRoles);

  const isAccepted = useMemo(() => (
    props.roles.some(role => userRoles.includes(role))
  ), [props.roles, userRoles,]);

  if (isAccepted) {
    return props.children;
  } else if (props.redirectPath) {
    return <Navigate to={props.redirectPath}/>;
  } else {
    return null;
  }
});
