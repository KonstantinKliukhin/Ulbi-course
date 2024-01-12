import { createSelector } from '@reduxjs/toolkit';
import { buildSelector } from '@/shared/lib';

export const [useUiScroll, getUiScroll,] = buildSelector(
  (state) => state.ui.scroll
);

export const getUiScrollByPath = createSelector(
  getUiScroll,
  (_: StateSchema, path: string) => path,
  (scroll, path) => scroll[path]
);
