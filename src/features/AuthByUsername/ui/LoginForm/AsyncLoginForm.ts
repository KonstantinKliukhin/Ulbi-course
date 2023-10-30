import { lazy } from 'react';

export const AsyncLoginForm = lazy(async () => await import('./LoginForm'));
