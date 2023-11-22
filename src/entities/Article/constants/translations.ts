import { ArticleType } from '../model/types/article';
import { type TFunction } from 'i18next';

export const ARTICLE_TYPE_TRANSLATIONS = {
  [ArticleType.ALL]: (t: TFunction<'article', undefined>) => t('article_type_all'),
  [ArticleType.SCIENCE]: (t: TFunction<'article', undefined>) => t('article_type_science'),
  [ArticleType.ECONOMICS]: (t: TFunction<'article', undefined>) => t('article_type_economics'),
  [ArticleType.IT]: (t: TFunction<'article', undefined>) => t('article_type_it'),
};
