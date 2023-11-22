import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesStateInited } from '../../selectors/getArticlesState/getArticlesState';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { getArticleFromStorage } from '../../../lib/articleStorage/articleStorage';
import { includes } from 'shared/lib/includes/includes';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { type SortOrder } from 'shared/types';

export const initArticlesPage =
    createAsyncThunk<Promise<void>, URLSearchParams, ThunkDefaultArg>(
      'articlesList/initArticlesPage',
      async (urlParams, thunkAPI) => {
        const state = thunkAPI.getState();
        const view = getArticleFromStorage();
        const _inited = getArticlesStateInited(state);

        const searchFromParams = urlParams.get('search');
        const sortFromParams = urlParams.get('sort');
        const orderFromParams = urlParams.get('order');
        const typeFromParams = urlParams.get('type');

        if (searchFromParams) {
          thunkAPI.dispatch(articlesPageActions.setSearch(searchFromParams));
        }
        if (sortFromParams && includes(sortFromParams, Object.values(ArticleSortField))) {
          thunkAPI.dispatch(articlesPageActions.setSort(sortFromParams));
        }
        if (orderFromParams && includes<SortOrder[]>(orderFromParams, ['asc', 'desc',])) {
          thunkAPI.dispatch(articlesPageActions.setOrder(orderFromParams));
        }
        if (typeFromParams && includes(typeFromParams, Object.values(ArticleType))) {
          thunkAPI.dispatch(articlesPageActions.setType(typeFromParams));
        }

        if (!_inited) {
          thunkAPI.dispatch(articlesPageActions.initState(view));
          void thunkAPI.dispatch(fetchArticlesList());
        }
      }
    );
