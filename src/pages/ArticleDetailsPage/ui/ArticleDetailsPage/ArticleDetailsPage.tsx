import { type FC } from 'react';
import { ArticleDetails, useGetArticleByIdQuery } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { ArticleNotFound } from '../ArticleNotFound/ArticleNotFound';
import { Page } from 'shared/ui';
import { ArticleRecommendations } from 'features/ArticleRecomemndations';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { type RtkError } from 'shared/types';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { useAddArticleView } from 'features/AddArticleView';

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
        <ArticleDetails
          article={articleDetailsData.data}
          isLoading={articleDetailsData.isLoading}
          error={(articleDetailsData.error as RtkError)?.message}
        />
        <ArticleRecommendations />
        <ArticleDetailsComments id={params.id}/>
      </Page>
    </>
  );
};

export default ArticleDetailsPage;
