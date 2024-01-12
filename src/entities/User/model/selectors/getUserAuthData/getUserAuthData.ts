import { buildSelector } from '@/shared/lib';

export const [useUserAuthData, getUserAuthData,] = buildSelector(
  (state) => state.user.authData ?? null
);
