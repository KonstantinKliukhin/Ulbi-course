import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type SelectOption } from '@/shared/ui';
import { ARTICLE_BLOCK_TYPE_TRANSLATIONS } from '../../../constants/translations';
import { ArticleBlockType } from '../../../constants/articleBlockType';

type ArticleTypeOptions = Array<SelectOption<ArticleBlockType>>;

export const useArticleBlockTypesSelectOptions = () => {
  const { t, } = useTranslation('article');

  return useMemo<ArticleTypeOptions>(
    () => [
      {
        value: ArticleBlockType.IMAGE,
        content: ARTICLE_BLOCK_TYPE_TRANSLATIONS[ArticleBlockType.IMAGE](t),
      },
      {
        value: ArticleBlockType.TEXT,
        content: ARTICLE_BLOCK_TYPE_TRANSLATIONS[ArticleBlockType.TEXT](t),
      },
      {
        value: ArticleBlockType.CODE,
        content: ARTICLE_BLOCK_TYPE_TRANSLATIONS[ArticleBlockType.CODE](t),
      },
    ],
    [t,]
  );
};
