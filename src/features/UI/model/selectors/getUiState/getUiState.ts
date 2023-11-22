import { createSelector } from '@reduxjs/toolkit';

export const getUiScroll = (state: StateSchema) => state.ui.scroll;

export const getUiScrollByPath = createSelector(
  getUiScroll,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path]
);
