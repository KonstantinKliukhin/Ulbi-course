import { createSlice } from '@reduxjs/toolkit';
import { type ArticleCommentsSchema } from '../types/ArticleCommentsSchema';
import { fetchArticleComments } from '../services/fetchArticleComments/fetchArticleComments';
import { commentsAdapter } from '../adapters/commentsAdapter';
import { addCommentForArticle } from '../services/addCommentForArticle/addCommentForArticle';

export const initialState: ArticleCommentsSchema = commentsAdapter.getInitialState({
  isLoading: false,
  error: null,
  addCommentError: null,
  addCommentIsLoading: false,
});

export const articleCommentsSlice = createSlice({
  name: 'articleComments',
  initialState,
  reducers: {
    addComment: commentsAdapter.addOne,
    removeComment: commentsAdapter.removeOne,
  },
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
      })
      .addCase(addCommentForArticle.pending, (state) => {
        state.addCommentIsLoading = true;
      })
      .addCase(addCommentForArticle.fulfilled, (state, action) => {
        state.addCommentIsLoading = false;
        state.addCommentError = null;
      })
      .addCase(addCommentForArticle.rejected, (state, action) => {
        state.addCommentIsLoading = false;
        state.addCommentError = action.payload ?? null;
      }),
});

export const { actions: articleCommentsActions, } = articleCommentsSlice;
export const articleCommentsReducer = articleCommentsSlice.reducer;
