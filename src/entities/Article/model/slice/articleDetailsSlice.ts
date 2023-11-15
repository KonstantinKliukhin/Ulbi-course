import { createSlice } from '@reduxjs/toolkit';
import { type ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetcharticleById } from '../services/fetchArticleById/fetchArticleById';

export const initialState: ArticleDetailsSchema = {
  data: null,
  isLoading: false,
  error: null,
};

export const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetcharticleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetcharticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetcharticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      }),
});

export const { actions: articleDetailsActions, } = articleDetailsSlice;
export const articleDetailsReducer = articleDetailsSlice.reducer;
