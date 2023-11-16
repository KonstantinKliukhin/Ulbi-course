import { createSlice } from '@reduxjs/toolkit';
import { type ArticleCommentsSchema } from '../types/ArticleCommentsSchema';
import { fetchArticleComments } from '../services/fetchArticleComments/fetchArticleComments';
import { commentsAdapter } from '../adapters/commentsAdapter';

const initialState: ArticleCommentsSchema = commentsAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const articleCommentsSlice = createSlice({
  name: 'articleComments',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchArticleComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticleComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        commentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      }),
});

export const { actions: articleCommentsActions, } = articleCommentsSlice;
export const articleCommentsReducer = articleCommentsSlice.reducer;
