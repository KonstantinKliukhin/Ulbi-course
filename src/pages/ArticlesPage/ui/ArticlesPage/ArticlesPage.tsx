import { type FC } from 'react';
import { ArticleList, ArticleView } from 'entities/Article';
import { mockedArticle } from 'shared/mocks';

const ArticlesPage: FC = () => {
  return (
    <ArticleList articles={Array(16).fill(mockedArticle).map((ar, i) => ({ ...ar, id: `${i}`, }))}
      view={ArticleView.SMALL}
      isLoading={true}
    />
  );
};

export default ArticlesPage;
