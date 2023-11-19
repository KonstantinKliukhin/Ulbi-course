import { type StateSchema } from 'app/providers/StoreProvider';
import {
  getAddCommentError,
  getAddCommentIsLoading,
  getArticleCommentsError,
  getArticleCommentsIsLoading
} from './getArticleCommentsState';

describe('getArticleCommentsState', () => {
  test('getArticleCommentsIsLoading should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getArticleCommentsIsLoading(mockedState as StateSchema)).toEqual(false);
  });

  test('getArticleCommentsIsLoading should return comments IsLoading state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      articleComments: {
        isLoading: true,
      },
    };

    expect(getArticleCommentsIsLoading(mockedState as StateSchema)).toEqual(true);
  });

  test('getArticleCommentsError should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getArticleCommentsError(mockedState as StateSchema)).toEqual(null);
  });

  test('getArticleCommentsError should return comments error state', () => {
    const error = 'Some api error';

    const mockedState: DeepPartial<StateSchema> = {
      articleComments: {
        error,
      },
    };

    expect(getArticleCommentsError(mockedState as StateSchema)).toEqual(error);
  });

  test('getAddCommentIsLoading should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getAddCommentIsLoading(mockedState as StateSchema)).toEqual(false);
  });

  test('getAddCommentIsLoading should return add comment IsLoading state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      articleComments: {
        addCommentIsLoading: true,
      },
    };

    expect(getAddCommentIsLoading(mockedState as StateSchema)).toEqual(true);
  });

  test('getAddCommentError should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getAddCommentError(mockedState as StateSchema)).toEqual(null);
  });

  test('getAddCommentError should return add comment error state', () => {
    const error = 'Some api error';

    const mockedState: DeepPartial<StateSchema> = {
      articleComments: {
        addCommentError: error,
      },
    };

    expect(getAddCommentError(mockedState as StateSchema)).toEqual(error);
  });
});
