import { type PayloadAction } from '@reduxjs/toolkit';
import { type UISchema } from '../types/UISchema';
import { buildSlice } from '@/shared/lib';

const initialState: UISchema = {
  scroll: {},
};

export const UISlice = buildSlice({
  name: 'UI',
  initialState,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<{ path: string; position: number }>) => {
      state.scroll[action.payload.path] = action.payload.position;
    },
  },
});

export const {
  UIActions,
  UIReducer,
  useUIActions,
} = UISlice;
