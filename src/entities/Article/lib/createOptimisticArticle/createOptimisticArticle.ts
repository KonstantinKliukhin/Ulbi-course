import { type Article } from '../../model/types/article';
import { type User } from 'entities/User';
import { type ArticleFormType } from '../../../../widgets/ManageArticle/model/types/articleForm';
import { v4 as uuidV4 } from 'uuid';

export const createOptimisticArticle = (
  articleForm: ArticleFormType,
  user: User
): Article => {
  const today = new Date();
  const createdAt = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()}`;

  return {
    ...articleForm,
    id: uuidV4(),
    user,
    createdAt,
    views: 0,
  };
};
