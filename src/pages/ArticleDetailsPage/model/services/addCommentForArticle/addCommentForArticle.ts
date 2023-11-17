import { createAsyncThunk } from '@reduxjs/toolkit';
import { COMMON_API_ERRORS } from 'shared/constants';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { type Comment } from 'entities/Comment';
import { v4 as uuidV4 } from 'uuid';
import { articleCommentsActions } from '../../slices/articleCommentsSlice';

interface SendCommentExtra extends ThunkDefaultArg {
  rejectValue: string
}

export const addCommentForArticle =
    createAsyncThunk<Comment | undefined, string, SendCommentExtra>(
      'articleDetails/addCommentForArticle',
      async (text, thunkAPI) => {
        const optimisticId = uuidV4();

        try {
          const state = thunkAPI.getState();
          const user = getUserAuthData(state);
          const articleId = getArticleDetailsData(state)?.id;

          if (!user?.id || !text || !articleId) {
            return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
          }

          const optimisticComment: Comment = {
            text,
            user,
            id: optimisticId,
          };

          thunkAPI.dispatch(articleCommentsActions.addComment(optimisticComment));

          const response = await thunkAPI.extra.api.post<Comment>(
            '/comments',
            {
              text,
              userId: user.id,
              articleId,
            }
          );

          if (!response.data) {
            throw new Error(COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
          }

          thunkAPI.dispatch(articleCommentsActions.removeComment(optimisticId));
          thunkAPI.dispatch(articleCommentsActions.addComment(response.data));

          return response.data;
        } catch (e) {
          console.error(e);
          thunkAPI.dispatch(articleCommentsActions.removeComment(optimisticId));

          if (e instanceof Error && e.message === COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER) {
            return thunkAPI.rejectWithValue(COMMON_API_ERRORS.NO_DATA_PROVIDED_FROM_SERVER);
          } else {
            return thunkAPI.rejectWithValue(COMMON_API_ERRORS.UNKNOWN_ERROR);
          }
        }
      }
    );
