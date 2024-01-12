import { type PayloadAction } from '@reduxjs/toolkit';
import { articlesAdapter } from '../adapters/articlesAdapter';
import { type ArticlesPageSchema } from '../types/articlesPageSchema';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { type SortOrder } from '@/shared/types';
import { buildSlice } from '@/shared/lib';

const BIG_ARTICLES_LIMIT = 4;
const SMALL_ARTICLES_LIMIT = 20;

export const initialState: ArticlesPageSchema = articlesAdapter.getInitialState({
  view: ArticleView.SMALL,
  type: ArticleType.ALL,
  isLoading: false,
  error: null,
  limit: 4,
  page: 1,
  hasMore: true,
  order: 'asc',
  sort: ArticleSortField.CREATED,
  search: '',
  isPageDecreased: false,
  saveItemIndex: 0,
  _inited: false,
});

export const articlesPageSlice = buildSlice({
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
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    setSavedItemIndex: (state, action: PayloadAction<number>) => {
      state.saveItemIndex = action.payload;
    },
    initState: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      state._inited = true;
      state.limit = action.payload === ArticleView.BIG ? BIG_ARTICLES_LIMIT : SMALL_ARTICLES_LIMIT;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        if (action.meta.arg?.replace) {
          articlesAdapter.removeAll(state);
        }
        state.isLoading = true;
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (action.meta.arg?.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      }),
});

export const {
  articlesPageActions,
  articlesPageReducer,
  useArticlesPageActions,
} = articlesPageSlice;
