import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { type SelectOption } from '@/shared/ui';
import { ARTICLE_TYPE_TRANSLATIONS } from '../../../constants/translations';
import { ArticleType } from '../../../constants/articleType';

type ArticleTypeOptions = Array<SelectOption<ArticleType>>;

export const useArticleTypesSelectOptions = () => {
  const { t, } = useTranslation('article');

  return useMemo<ArticleTypeOptions>(
    () => [
      {
        value: ArticleType.IT,
        content: ARTICLE_TYPE_TRANSLATIONS[ArticleType.IT](t),
      },
      {
        value: ArticleType.SCIENCE,
        content: ARTICLE_TYPE_TRANSLATIONS[ArticleType.SCIENCE](t),
      },
      {
        value: ArticleType.ECONOMICS,
        content: ARTICLE_TYPE_TRANSLATIONS[ArticleType.ECONOMICS](t),
      },
    ],
    [t,]
  );
};
