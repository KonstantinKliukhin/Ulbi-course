import { createSlice } from '@reduxjs/toolkit';
import { type BreadcrumbsSchema } from '../types/breadcrumbsSchema';
import { getInitialBreadcrumbs } from '../getInitialBreadcrumbs/getInitialBreadcrumbs';

const initialState: BreadcrumbsSchema = {
  currentBreadcrumbs: getInitialBreadcrumbs(),
};

export const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {},
});

export const { actions: breadcrumbsActions, reducer: breadcrumbsReducer, } =
  breadcrumbsSlice;
