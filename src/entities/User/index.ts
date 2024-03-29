export { useLogout } from './model/hooks/useLogout/useLogout';

export { getUserAuthData, useUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export {
  getIsManagerUser,
  useIsManagerUser,
  useIsSimpleUser,
  useUserRoles,
  useIsAdminUser,
  getIsAdminUser,
  getIsSimpleUser,
  getUserRoles
} from './model/selectors/getUserRoles/getUserRoles';

export { userReducer, userActions } from './model/slice/userSlice';

export type { User, UserSchema } from './model/types/user';
export { UserRole } from './model/constants/userRoles';
export { RequireAuth } from './model/middlewares/RequireAuth/RequireAuth';
export { RequireRoles } from './model/middlewares/RequireRoles/RequireRoles';
export { withRequireAuth } from './model/middlewares/withRequireAuth/withRequireAuth';
export { useIsAuthorized } from './model/hooks/useIsAuthorized/useIsAuthorized';

export { UserInfo } from './ui/UserInfo/UserInfo';
