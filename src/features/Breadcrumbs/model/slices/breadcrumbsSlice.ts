import { type BreadcrumbsSchema } from '../types/breadcrumbsSchema';
import { getInitialBreadcrumbs } from '../getInitialBreadcrumbs/getInitialBreadcrumbs';
import { buildSlice } from '@/shared/lib';

const initialState: BreadcrumbsSchema = {
  currentBreadcrumbs: getInitialBreadcrumbs(),
};

export const breadcrumbsSlice = buildSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {},
});

export const {
  breadcrumbsActions,
  breadcrumbsReducer,
} = breadcrumbsSlice;
