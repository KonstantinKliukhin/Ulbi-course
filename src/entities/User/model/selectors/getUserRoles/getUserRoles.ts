import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../../constants/userRoles';
import { buildSelector } from '@/shared/lib';

export const [useUserRoles, getUserRoles,] = buildSelector(
  (state) => state.user.authData?.roles ?? []
);

export const [useIsAdminUser, getIsAdminUser,] = buildSelector(createSelector(
  [getUserRoles,],
  (roles) => roles.includes(UserRole.ADMIN)
));

export const [useIsManagerUser, getIsManagerUser,] = buildSelector(createSelector(
  [getUserRoles,],
  (roles) => roles.includes(UserRole.MANAGER)
));

export const [useIsSimpleUser, getIsSimpleUser,] = buildSelector(createSelector(
  [getUserRoles,],
  (roles) => roles.includes(UserRole.MANAGER)
));
