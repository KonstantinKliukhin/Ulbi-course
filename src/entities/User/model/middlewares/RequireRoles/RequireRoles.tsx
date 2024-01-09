import { memo, type PropsWithChildren, useMemo } from 'react';
import { useAppSelector } from '@/shared/lib';
import { getUserRoles } from '../../selectors/getUserRoles/getUserRoles';
import { Navigate } from 'react-router-dom';
import type { UserRole } from '../../constants/userRoles';

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
