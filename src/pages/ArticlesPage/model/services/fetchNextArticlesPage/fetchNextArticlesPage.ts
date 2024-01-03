import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getArticlesHasMore, getArticlesIsLoading,
  getArticlesPageNum
} from '../../selectors/getArticlesState/getArticlesState';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage =
    createAsyncThunk<Promise<void>, undefined, ThunkDefaultArg>(
      'articlesList/fetchNextArticlesPage',
      async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const page = getArticlesPageNum(state);
        const hasMore = getArticlesHasMore(state);
        const isLoading = getArticlesIsLoading(state);

        if (hasMore && !isLoading) {
          thunkAPI.dispatch(articlesPageActions.setPage(page + 1));
          void thunkAPI.dispatch(fetchArticlesList());
        }
      }
    );
