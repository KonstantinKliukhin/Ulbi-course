import { lazy } from 'react';

export const AsyncAboutPage = lazy(async () => await import('./AboutPage'));
