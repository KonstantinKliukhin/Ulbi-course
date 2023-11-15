import { type StateSchema } from 'app/providers/StoreProvider';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from './getArticleDetails';
import { mockedArticle } from 'shared/mocks';

describe('getArticleDetails', () => {
  test('getArticleDetailsData should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getArticleDetailsData(mockedState as StateSchema)).toEqual(null);
  });

  test('getArticleDetailsData should return articleDetails data state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      articleDetails: {
        data: mockedArticle,
      },
    };

    expect(getArticleDetailsData(mockedState as StateSchema)).toEqual(mockedArticle);
  });

  test('getArticleDetailsIsLoading should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getArticleDetailsIsLoading(mockedState as StateSchema)).toEqual(false);
  });

  test('getArticleDetailsIsLoading should return articleDetails isLoading state', () => {
    const mockedState: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    };

    expect(getArticleDetailsIsLoading(mockedState as StateSchema)).toEqual(true);
  });

  test('getArticleDetailsError should work with empty state', () => {
    const mockedState: DeepPartial<StateSchema> = {};

    expect(getArticleDetailsError(mockedState as StateSchema)).toEqual(null);
  });

  test('getArticleDetailsError should return articleDetails error state', () => {
    const error = 'Some api error';
    const mockedState: DeepPartial<StateSchema> = {
      articleDetails: {
        error,
      },
    };

    expect(getArticleDetailsError(mockedState as StateSchema)).toEqual(error);
  });
});
