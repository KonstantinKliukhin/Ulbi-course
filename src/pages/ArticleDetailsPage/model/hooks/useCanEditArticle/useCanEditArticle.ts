import { type Article } from '@/entities/Article';
import { useUserAuthData } from '@/entities/User';
import { useMemo } from 'react';

export const useGetCanEditArticle = (article?: Article) => {
  const user = useUserAuthData();

  return useMemo(() => {
    if (!article?.user.id || !user?.id) {
      return false;
    } else {
      return article.user.id === user.id;
    }
  }, [article, user?.id,]);
};
