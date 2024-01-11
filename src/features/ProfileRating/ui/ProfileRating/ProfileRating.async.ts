import { lazy } from 'react';

export const ProfileRatingAsync = lazy(
  async () => import('./ProfileRating')
);
