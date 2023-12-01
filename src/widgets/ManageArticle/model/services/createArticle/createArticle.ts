import { createAsyncThunk } from '@reduxjs/toolkit';
import { COMMON_API_ERRORS } from 'shared/constants';
import { getUserAuthData } from 'entities/User';
import { type Article } from 'entities/Article';
import { type ArticleFormType } from '../../types/articleForm';
import { articleFormToDTO } from '../../../lib/articleFormToDTO/articleFormToDTO';
import { RoutePath } from 'shared/config';

interface CreateArticleExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const createArticle = createAsyncThunk<
Article | undefined,
ArticleFormType,
CreateArticleExtra
>('manageArticle/createArticle', async (articleFormValues, thunkAPI) => {
  const state = thunkAPI.getState();
  const user = getUserAuthData(state);

  try {
    if (!user?.id) {
      return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
    }

    const articleDTO = articleFormToDTO({
      form: articleFormValues,
      userId: user.id,
    });

    const response = await thunkAPI.extra.api.post<Article>(
      '/articles',
      articleDTO,
      {
        params: {
          _expand: 'user',
        },
      }
    );

    if (!response.data) {
      throw new Error(COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
    }

    thunkAPI.extra.navigate(RoutePath.articleDetails(response.data.id));

    return response.data;
  } catch (e) {
    console.error(e);

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
