import { type ArticleFormType } from '../../model/types/articleForm';
import { type Article, type ArticleDTO } from 'entities/Article';
import { omit } from 'shared/lib';

interface ArticleFormToDTOArg {
  form: ArticleFormType
  initialArticle?: Article
  userId: string
}

export const articleFormToDTO = (arg: ArticleFormToDTOArg): ArticleDTO => {
  const today = new Date();
  const formattedDate = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()}`;
  return omit(
    {
      ...arg.initialArticle,
      ...arg.form,
      userId: arg.userId,
      views: arg.initialArticle?.views ?? 0,
      ...(!arg.initialArticle && { createdAt: formattedDate, }),
    },
    'id'
  );
};
