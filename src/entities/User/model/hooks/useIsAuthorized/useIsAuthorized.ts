import { useAppSelector } from 'shared/lib';
import { getUserAuthData } from '../../selectors/getUserAuthData/getUserAuthData';

export const useIsAuthorized = () => Boolean(useAppSelector(getUserAuthData));
