import { createAsyncThunk } from '@reduxjs/toolkit';
import { COMMON_API_ERRORS } from 'shared/constants';
import { type Article, ArticleType } from 'entities/Article';
import {
  getArticlesLimit,
  getArticlesOrder,
  getArticlesPageNum,
  getArticlesSearch,
  getArticlesSort,
  getArticlesType
} from '../../selectors/getArticlesState/getArticlesState';
import { addQueryParams } from 'shared/lib/url/addQueryParameters/addQueryParameters';

interface FetchArticlesListExtra extends ThunkDefaultArg {
  rejectValue: string
}

type FetchArticlesListArg = {
  replace?: boolean
} | undefined;

export const fetchArticlesList =
    createAsyncThunk<Article[], FetchArticlesListArg, FetchArticlesListExtra>(
      'articlesList/fetchArticlesList',
      async (_, thunkAPI) => {
        try {
          const state = thunkAPI.getState();
          const limit = getArticlesLimit(state);
          const page = getArticlesPageNum(state);
          const sort = getArticlesSort(state);
          const order = getArticlesOrder(state);
          const search = getArticlesSearch(state);
          const type = getArticlesType(state);
          addQueryParams({
            sort,
            order,
            search,
            type,
          });
          const response = await thunkAPI.extra.api.get<Article[]>(
            '/articles',
            {
              params: {
                _expand: 'user',
                _page: page,
                _limit: limit,
                _sort: sort,
                _order: order,
                q: search,
                type: type === ArticleType.ALL ? undefined : type,
              },
            }
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
