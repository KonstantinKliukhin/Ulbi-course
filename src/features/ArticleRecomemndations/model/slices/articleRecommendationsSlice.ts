import { createSlice } from '@reduxjs/toolkit';
import { type ArticleRecommendationsSchema } from '../types/ArticleRecommendationsSchema';
import { articleRecommendationsAdapter } from '../adapters/articleRecommendationsAdapter';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

const initialState: ArticleRecommendationsSchema = articleRecommendationsAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const articleRecommendationsSlice = createSlice({
  name: 'articleRecommendations',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        articleRecommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      }),
});

export const {
  actions: articleRecomendationsActions,
  reducer: articleRecomendationsReducer,
} = articleRecommendationsSlice;
