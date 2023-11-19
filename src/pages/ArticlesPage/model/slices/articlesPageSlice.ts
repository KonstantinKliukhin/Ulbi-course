import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { articlesAdapter } from '../adapters/articlesAdapter';
import { type ArticlesPageSchema } from '../types/articlesPageSchema';
import { ArticleView } from 'entities/Article';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

export const initialState: ArticlesPageSchema = articlesAdapter.getInitialState({
  view: ArticleView.SMALL,
  isLoading: false,
  error: null,
});

export const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        articlesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      }),
});

export const { actions: articlesPageActions, } = articlesPageSlice;
export const articlesPageReducer = articlesPageSlice.reducer;
