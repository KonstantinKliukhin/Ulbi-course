import { createAsyncThunk } from '@reduxjs/toolkit';
import { COMMON_API_ERRORS } from 'shared/constants';
import { type Comment } from 'entities/Comment';

interface FetchArticleCommentsExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const fetchArticleComments =
    createAsyncThunk<Comment[], string, FetchArticleCommentsExtra>(
      'articleComments/fetchArticleComments',
      async (articleId, thunkAPI) => {
        try {
          const response = await thunkAPI.extra.api.get<Comment[]>(
            '/comments',
            { params: { articleId, _expand: 'user', }, }
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
