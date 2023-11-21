import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk';
import { addCommentForArticle } from './addCommentForArticle';
import { mockedArticle, mockedComment, mockedUser } from 'shared/mocks';
import { articleCommentsActions } from '../../slices/articleCommentsSlice';

jest.mock('../../slices/articleCommentsSlice');

describe('fetchArticlesList', () => {
  test('success add comment to article', async () => {
    const commentText = 'Some comment';
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      articleDetails: {
        data: mockedArticle,
      },
      articleComments: {
        ids: [],
        entities: {},
      },
      user: {
        authData: mockedUser,
      },
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ data: mockedComment, }));

    const result = await thunk.callThunk(commentText);

    expect(thunk.dispatch).toHaveBeenCalledTimes(5);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
      userId: mockedUser.id,
      articleId: mockedArticle.id,
      text: commentText,
    });
    expect(articleCommentsActions.addComment).toHaveBeenCalledTimes(2);
    expect(articleCommentsActions.addComment).toHaveBeenLastCalledWith(mockedComment);
    expect(articleCommentsActions.removeComment).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockedComment);
  });

  test('error add comment to article', async () => {
    const commentText = 'Some comment';
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      articleDetails: {
        data: mockedArticle,
      },
      articleComments: {
        ids: [],
        entities: {},
      },
      user: {
        authData: mockedUser,
      },
    });

    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403, }));

    const result = await thunk.callThunk(commentText);

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
      userId: mockedUser.id,
      articleId: mockedArticle.id,
      text: commentText,
    });
    expect(articleCommentsActions.removeComment).toHaveBeenCalled();
    expect(articleCommentsActions.addComment).toHaveBeenCalledTimes(1);
    expect(result.meta.requestStatus).toBe('rejected');
  });

  test('must not fetch article when no text provided', async () => {
    const commentText = '';
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      articleDetails: {
        data: mockedArticle,
      },
      articleComments: {
        ids: [],
        entities: {},
      },
      user: {
        authData: mockedUser,
      },
    });
    const result = await thunk.callThunk(commentText);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).not.toHaveBeenCalled();
    expect(articleCommentsActions.removeComment).not.toHaveBeenCalled();
    expect(articleCommentsActions.addComment).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
