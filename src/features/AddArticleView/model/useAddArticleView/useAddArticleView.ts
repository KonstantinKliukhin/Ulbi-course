import { useAddViewMutation } from '../../api/addArticleViewApi/addArticleViewApi';
import { useEffect } from 'react';
import { type Article } from 'entities/Article';

export const useAddArticleView = (article?: Article) => {
  const [addArticleView,] = useAddViewMutation();

  useEffect(() => {
    if (article) {
      void addArticleView(article);
    }
  }, [article, addArticleView,]);
};
