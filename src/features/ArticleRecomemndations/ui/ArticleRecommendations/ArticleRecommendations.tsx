import { type FC } from 'react';
import cls from './ArticleRecommendations.module.scss';
import { Text, VStack } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { ArticleList, ArticleView } from '@/entities/Article';
import { useGetArticleRecommendationsQuery } from '../../api/articleRecommendationsApi';
import { type RtkError } from '@/shared/types';

interface ArticleRecommendationsProps {
  className?: string;
}

export const ArticleRecommendations: FC<ArticleRecommendationsProps> = (props) => {
  const { t, } = useTranslation('article');
  const articleRecommendationsData = useGetArticleRecommendationsQuery({ limit: 4, });

  return (
    <VStack role="region"
      yGap={16}
      align="start"
      className={props.className}
    >
      <Text title={t('recommendations')} size="l" />
      <ArticleList
        skeletonsCount={4}
        cardLinkTarget="_blank"
        className={cls.list}
        view={ArticleView.SMALL}
        articles={articleRecommendationsData.data ?? []}
        isLoading={articleRecommendationsData.isLoading}
        error={(articleRecommendationsData.error as RtkError)?.message}
      />
    </VStack>
  );
};
