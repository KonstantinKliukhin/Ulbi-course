import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getArticlesOrder, getArticlesSearch,
  getArticlesSort,
  getArticlesStateInited, getArticlesType
} from '../../selectors/getArticlesState/getArticlesState';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { getArticleViewFromStorage } from '../../../lib/articleStorage/articleStorage';
import { includes, addQueryParams } from 'shared/lib';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { type SortOrder } from 'shared/types';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage =
    createAsyncThunk<Promise<void>, URLSearchParams, ThunkDefaultArg>(
      'articlesList/initArticlesPage',
      async (urlParams, thunkAPI) => {
        const state = thunkAPI.getState();
        const view = getArticleViewFromStorage();
        const stateInited = getArticlesStateInited(state);
        const stateSort = getArticlesSort(state);
        const stateOrder = getArticlesOrder(state);
        const stateSearch = getArticlesSearch(state);
        const stateType = getArticlesType(state);

        const searchFromParams = urlParams.get('search');
        const sortFromParams = urlParams.get('sort');
        const orderFromParams = urlParams.get('order');
        const typeFromParams = urlParams.get('type');

        if (searchFromParams) {
          thunkAPI.dispatch(articlesPageActions.setSearch(searchFromParams));
        } else if (stateInited && stateSearch) {
          addQueryParams({ search: stateSearch, });
        }
        if (sortFromParams && includes(sortFromParams, Object.values(ArticleSortField))) {
          thunkAPI.dispatch(articlesPageActions.setSort(sortFromParams));
        } else if (stateInited && stateSort) {
          addQueryParams({ sort: stateSort, });
        }

        if (orderFromParams && includes<SortOrder[]>(orderFromParams, ['asc', 'desc',])) {
          thunkAPI.dispatch(articlesPageActions.setOrder(orderFromParams));
        } else if (stateInited && stateOrder) {
          addQueryParams({ order: stateOrder, });
        }

        if (typeFromParams && includes(typeFromParams, Object.values(ArticleType))) {
          thunkAPI.dispatch(articlesPageActions.setType(typeFromParams));
        } else if (stateInited && stateType) {
          addQueryParams({ type: stateType, });
        }

        if (!stateInited) {
          thunkAPI.dispatch(articlesPageActions.initState(view));
          void thunkAPI.dispatch(fetchArticlesList());
        }
      }
    );
