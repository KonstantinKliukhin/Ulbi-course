import { type FC, Suspense } from 'react';
import { ArticleDetails, useGetArticleByIdQuery } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { ArticleNotFound } from '../ArticleNotFound/ArticleNotFound';
import { Loader, Page, VStack } from '@/shared/ui';
import { ArticleRecommendations } from '@/features/ArticleRecomemndations';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { type RtkError } from '@/shared/types';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { useAddArticleView } from '@/features/AddArticleView';
import { ArticleRating } from '@/features/ArticleRating';

const ArticleDetailsPage: FC = () => {
  const params = useParams<{ id: string }>();
  const articleDetailsData = useGetArticleByIdQuery(
    { id: params.id ?? '', },
    { skip: !params.id, }
  );

  useAddArticleView(articleDetailsData.data);

  if (!params.id) return <ArticleNotFound />;

  return (
    <>
      <ArticleDetailsPageHeader article={articleDetailsData.data} />
      <Page>
        <VStack align="stretch" yGap={32}>
          <ArticleDetails
            article={articleDetailsData.data}
            isLoading={articleDetailsData.isLoading}
            error={(articleDetailsData.error as RtkError)?.message}
          />
          <Suspense fallback={<Loader centered />}>
            <ArticleRating articleId={params.id}/>
          </Suspense>
          <ArticleRecommendations />
          <ArticleDetailsComments articleId={params.id}/>
        </VStack>
      </Page>
    </>
  );
};

export default ArticleDetailsPage;
