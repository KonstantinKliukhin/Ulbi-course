import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ManageArticleSchema } from '../types/manageArticleSchema';
import { type ArticleBlock } from '@/entities/Article';

const initialState: ManageArticleSchema = {
  blockFormMode: 'none',
  currentBlockIndex: -1,
  editingArticleBlock: null,
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
        newIndex: number;
        editingArticleBlock: ArticleBlock;
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
        newIndex: number;
        copyingArticleBlock: ArticleBlock;
      }>
    ) => {
      state.currentBlockIndex = action.payload.newIndex;
      state.blockFormMode = 'copy';
      state.editingArticleBlock = action.payload.copyingArticleBlock;
    },
  },
});

export const { actions: manageArticleActions, reducer: manageArticleReducer, } =
  manageArticleSlice;
