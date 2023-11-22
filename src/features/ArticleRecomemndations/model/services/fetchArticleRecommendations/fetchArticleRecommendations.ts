import { createAsyncThunk } from '@reduxjs/toolkit';
import { COMMON_API_ERRORS } from 'shared/constants';
import { type Article } from 'entities/Article';

interface FetchArticleRecommendationsExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const fetchArticleRecommendations =
    createAsyncThunk<Article[], undefined, FetchArticleRecommendationsExtra>(
      'articleRecommendations/fetchArticleRecommendations',
      async (_, thunkAPI) => {
        try {
          const response = await thunkAPI.extra.api.get<Article[]>('/articles', {
            params: {
              _limit: 4,
              _expand: 'user',
            },
          });

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
