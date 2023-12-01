import { createAsyncThunk } from '@reduxjs/toolkit';
import { COMMON_API_ERRORS } from 'shared/constants';
import { type Article } from '../../types/article';

interface fetchArticleByIdExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const fetchArticleById =
    createAsyncThunk<Article, string, fetchArticleByIdExtra>(
      'article/fetchArticleById',
      async (id, thunkAPI) => {
        try {
          const response = await thunkAPI.extra.api.get<Article>(`/articles/${id}`, {
            params: {
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
