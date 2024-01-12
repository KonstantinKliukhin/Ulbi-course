import { buildSelector } from '@/shared/lib';

export const [useProfileReadonly, getProfileReadonly,] = buildSelector(
  (state) => state.profilePage?.readonly ?? true
);
