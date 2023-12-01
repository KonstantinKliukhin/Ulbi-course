import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { type Article } from '../types/article';

export const initialState: ArticleDetailsSchema = {
  data: null,
  isLoading: false,
  error: null,
};

export const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {
    setArticle: (state, action: PayloadAction<Article | null>) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      }),
});

export const { actions: articleDetailsActions, reducer: articleDetailsReducer, } = articleDetailsSlice;
