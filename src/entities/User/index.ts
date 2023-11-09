export { useLogout } from 'entities/User/model/hooks/useLogout/useLogout';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export { useInitUser } from './model/hooks/useInitUser/useInitUser';

export { userReducer, userActions } from './model/slice/userSlice';

export type { User, UserSchema } from './model/types/user';

export { AuthorizedComponent } from './model/middlewares/AuthorizedComponent/AuthorizedComponent';
export { withAuthorization } from './model/middlewares/withAuthorization/withAuthorization';
export { useIsAuthorized } from './model/hooks/useIsAuthorized/useIsAuthorized';
