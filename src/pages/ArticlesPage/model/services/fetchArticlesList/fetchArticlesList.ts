import { createAsyncThunk } from '@reduxjs/toolkit';
import { COMMON_API_ERRORS } from 'shared/constants';
import { type Article } from 'entities/Article';
import { getArticlesLimit } from 'pages/ArticlesPage/model/selectors/getArticlesState/getArticlesState';

interface FetchArticlesListExtra extends ThunkDefaultArg {
  rejectValue: string
}

interface FetchArticlesListArg {
  page: number
}

export const fetchArticlesList =
    createAsyncThunk<Article[], FetchArticlesListArg, FetchArticlesListExtra>(
      'articlesList/fetchArticlesList',
      async (arg, thunkAPI) => {
        try {
          const state = thunkAPI.getState();
          const limit = getArticlesLimit(state);
          const response = await thunkAPI.extra.api.get<Article[]>(
            '/articles',
            { params: { _expand: 'user', _page: arg.page, _limit: limit, }, }
          );

          if (!response.data) {
            throw new Error(COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
          }

          return response.data;
        } catch (e) {
          console.error(e);

          if (e instanceof Error && e.message === COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER) {
            return thunkAPI.rejectWithValue(COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
          } else {
            return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
          }
        }
      }
    );
