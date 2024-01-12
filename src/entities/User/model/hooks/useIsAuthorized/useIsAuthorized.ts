import { useUserAuthData } from '../../selectors/getUserAuthData/getUserAuthData';
export const useIsAuthorized = () => Boolean(useUserAuthData());
