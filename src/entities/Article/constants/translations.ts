import { type TFunction } from 'i18next';
import { ArticleBlockType } from './articleBlockType';
import { ArticleType } from '../constants/articleType';

export const ARTICLE_TYPE_TRANSLATIONS = {
  [ArticleType.ALL]: (t: TFunction<'article', undefined>) => t('article_type_all'),
  [ArticleType.SCIENCE]: (t: TFunction<'article', undefined>) => t('article_type_science'),
  [ArticleType.ECONOMICS]: (t: TFunction<'article', undefined>) => t('article_type_economics'),
  [ArticleType.IT]: (t: TFunction<'article', undefined>) => t('article_type_it'),
};

export const ARTICLE_BLOCK_TYPE_TRANSLATIONS = {
  [ArticleBlockType.TEXT]: (t: TFunction<'article', undefined>) => t('article_block_type_text'),
  [ArticleBlockType.CODE]: (t: TFunction<'article', undefined>) => t('article_block_type_code'),
  [ArticleBlockType.IMAGE]: (t: TFunction<'article', undefined>) => t('article_block_type_image'),
};
