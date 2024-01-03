import { type Article } from 'entities/Article';
import { getUserAuthData } from 'entities/User';
import { useAppSelector } from 'shared/lib';
import { useMemo } from 'react';

export const useGetCanEditArticle = (article?: Article) => {
  const user = useAppSelector(getUserAuthData);

  return useMemo(() => {
    if (!article?.user.id || !user?.id) {
      return false;
    } else {
      return article.user.id === user.id;
    }
  }, [article, user?.id,]);
};
