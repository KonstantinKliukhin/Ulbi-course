import { createAsyncThunk } from '@reduxjs/toolkit';
import { COMMON_API_ERRORS } from 'shared/constants';
import { getUserAuthData } from 'entities/User';
import {
  type Article,
  articleDetailsActions,
  getArticleDetailsData
} from 'entities/Article';
import { type ArticleFormType } from '../../types/articleForm';
import { createOptimisticArticle } from '../../../lib/createOptimisticArticle/createOptimisticArticle';
import { articleFormToDTO } from '../../../lib/articleFormToDTO/articleFormToDTO';

interface UpdateArticleExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const updateArticle = createAsyncThunk<
Article | undefined,
ArticleFormType,
UpdateArticleExtra
>('manageArticle/updateArticle', async (articleFormValues, thunkAPI) => {
  const state = thunkAPI.getState();
  const user = getUserAuthData(state);
  const oldArticle = getArticleDetailsData(state);

  try {
    if (!user?.id || !oldArticle) {
      return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
    }

    const optimisticArticle = createOptimisticArticle(articleFormValues, user);
    const articleDTO = articleFormToDTO({
      form: articleFormValues,
      initialArticle: oldArticle,
      userId: user.id,
    });

    thunkAPI.dispatch(articleDetailsActions.setArticle(optimisticArticle));

    const response = await thunkAPI.extra.api.put<Article>(
      `/articles/${oldArticle.id}`,
      articleDTO
    );

    if (!response.data) {
      throw new Error(COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
    }

    thunkAPI.dispatch(articleDetailsActions.setArticle(response.data));

    return response.data;
  } catch (e) {
    console.error(e);
    thunkAPI.dispatch(articleDetailsActions.setArticle(oldArticle));

    if (
      e instanceof Error &&
      e.message === COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER
    ) {
      return thunkAPI.rejectWithValue(
        COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER
      );
    } else {
      return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
    }
  }
});
