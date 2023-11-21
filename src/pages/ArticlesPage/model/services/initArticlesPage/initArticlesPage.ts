import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesStateInited } from '../../selectors/getArticlesState/getArticlesState';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { getArticleFromStorage } from '../../../lib/articleStorage/articleStorage';

export const initArticlesPage =
    createAsyncThunk<Promise<void>, undefined, ThunkDefaultArg>(
      'articlesList/initArticlesPage',
      async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const view = getArticleFromStorage();
        const _inited = getArticlesStateInited(state);

        if (!_inited) {
          thunkAPI.dispatch(articlesPageActions.initState(view));
          void thunkAPI.dispatch(fetchArticlesList({ page: 1, }));
        }
      }
    );
