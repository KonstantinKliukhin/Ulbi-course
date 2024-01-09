import { type StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../../constants/userRoles';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles ?? [];

export const getIsAdminUser = createSelector(
  [getUserRoles,],
  (roles) => roles.includes(UserRole.ADMIN)
);

export const getIsManagerUser = createSelector(
  [getUserRoles,],
  (roles) => roles.includes(UserRole.MANAGER)
);

export const getIsSimpleUser = createSelector(
  [getUserRoles,],
  (roles) => roles.includes(UserRole.MANAGER)
);
