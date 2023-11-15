import { type FC } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { ArticleNotFound } from './ArticleNotFound/ArticleNotFound';

const ArticleDetailsPage: FC = () => {
  const params = useParams<{ id: string }>();

  if (!params.id) return <ArticleNotFound/>;

  return <ArticleDetails id={params.id}/>;
};

export default ArticleDetailsPage;
