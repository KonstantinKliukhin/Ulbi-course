import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { articlesAdapter } from '../adapters/articlesAdapter';
import { type ArticlesPageSchema } from '../types/articlesPageSchema';
import { ArticleView } from 'entities/Article';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

const BIG_ARTICLES_LIMIT = 4;
const SMALL_ARTICLES_LIMIT = 20;

export const initialState: ArticlesPageSchema = articlesAdapter.getInitialState({
  view: ArticleView.SMALL,
  isLoading: false,
  error: null,
  limit: 4,
  page: 1,
  hasMore: true,
  _inited: false,
});

export const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    initState: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      state._inited = true;
      state.limit = action.payload === ArticleView.BIG ? BIG_ARTICLES_LIMIT : SMALL_ARTICLES_LIMIT;
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
        articlesAdapter.addMany(state, action.payload);
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      }),
});

export const { actions: articlesPageActions, } = articlesPageSlice;
export const articlesPageReducer = articlesPageSlice.reducer;
