import { buildSelector } from '@/shared/lib';

export const [useLoginIsLoading, getLoginIsLoading,] = buildSelector(
  (state) => state.loginForm?.isLoading ?? false
);

export const [useLoginError, getLoginError,] = buildSelector(
  (state) => state.loginForm?.error ?? null
);
