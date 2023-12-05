import { type FC } from 'react';
import cls from './ArticleRecommendations.module.scss';
import {
  useAction,
  useAppSelector,
  useInitialEffect,
  withLazySlices
} from 'shared/lib';
import {
  getArticleRecommendationsError,
  getArticleRecommendationsIsLoading,
  getArticleRecommendationsState
} from '../../model/selectors/getArticleRecommendationsState/getArticleRecommendationsState';
import { Text, VStack } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { ArticleList, ArticleView } from 'entities/Article';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleRecomendationsReducer } from '../../model/slices/articleRecommendationsSlice';

interface ArticleRecommendationsProps {
  className?: string
}

const ArticleRecommendations: FC<ArticleRecommendationsProps> = (props) => {
  const { t, } = useTranslation('article');
  const recommendations = useAppSelector(
    getArticleRecommendationsState.selectAll
  );
  const recommendationsIsLoading = useAppSelector(
    getArticleRecommendationsIsLoading
  );
  const recommendationsError = useAppSelector(getArticleRecommendationsError);
  useInitialEffect(useAction(fetchArticleRecommendations));

  return (
    <VStack role="region"
      yGap={16}
      align="start"
      className={props.className}
    >
      <Text title={t('recommendations')} size="l" />
      <ArticleList
        cardLinkTarget="_blank"
        className={cls.list}
        view={ArticleView.SMALL}
        articles={recommendations}
        isLoading={recommendationsIsLoading}
        error={recommendationsError}
      />
    </VStack>
  );
};

const composedArticleRecommendations = withLazySlices({
  reducers: { articleRecommendations: articleRecomendationsReducer, },
  onlyIfSliceReady: true,
  removeOnUnmount: true,
})(ArticleRecommendations);

export { composedArticleRecommendations as ArticleRecommendations };
