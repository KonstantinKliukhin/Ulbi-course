import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ManageArticleSchema } from '../types/manageArticleSchema';
import { type ArticleBlock } from 'entities/Article';
import { updateArticle } from '../services/updateArticle/updateArticle';
import { createArticle } from '../services/createArticle/createArticle';

const initialState: ManageArticleSchema = {
  blockFormMode: 'none',
  currentBlockIndex: -1,
  editingArticleBlock: null,
  isLoading: false,
  error: null,
};

export const manageArticleSlice = createSlice({
  name: 'manageArticle',
  initialState,
  reducers: {
    resetArticleBlockFormData: (state) => {
      state.blockFormMode = 'none';
      state.editingArticleBlock = null;
      state.currentBlockIndex = -1;
    },
    editArticleBlock: (
      state,
      action: PayloadAction<{
        newIndex: number
        editingArticleBlock: ArticleBlock
      }>
    ) => {
      state.editingArticleBlock = action.payload.editingArticleBlock;
      state.currentBlockIndex = action.payload.newIndex;
      state.blockFormMode = 'edit';
    },
    addArticleBlock: (state, action: PayloadAction<number>) => {
      state.currentBlockIndex = action.payload;
      state.blockFormMode = 'create';
    },
    copyArticleBlock: (
      state,
      action: PayloadAction<{
        newIndex: number
        copyingArticleBlock: ArticleBlock
      }>
    ) => {
      state.currentBlockIndex = action.payload.newIndex;
      state.blockFormMode = 'copy';
      state.editingArticleBlock = action.payload.copyingArticleBlock;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.error = action.payload ?? null;
      })
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.error = action.payload ?? null;
      }),
});

export const { actions: manageArticleActions, reducer: manageArticleReducer, } =
  manageArticleSlice;
