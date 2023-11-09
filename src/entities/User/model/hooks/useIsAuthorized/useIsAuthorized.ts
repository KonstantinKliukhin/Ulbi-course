import { useAppSelector } from 'shared/lib';
import { getUserAuthData } from 'entities/User';

export const useIsAuthorized = () => Boolean(useAppSelector(getUserAuthData));
