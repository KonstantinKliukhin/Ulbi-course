import { articleRecommendationsAdapter } from '../../adapters/articleRecommendationsAdapter';

export const getArticleRecommendationsState = articleRecommendationsAdapter.getSelectors<StateSchema>(
  state => state.articleRecommendations ?? articleRecommendationsAdapter.getInitialState()
);

export const getArticleRecommendationsIsLoading =
    (state: StateSchema) => state.articleRecommendations?.isLoading ?? false;
export const getArticleRecommendationsError =
    (state: StateSchema) => state.articleRecommendations?.error ?? null;
