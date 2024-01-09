import {
  type ArticleBlock,
  ArticleBlockType,
  type ArticleCodeBlock,
  type ArticleImageBlock,
  type ArticleTextBlock
} from '@/entities/Article';
import { v4 as uuidV4 } from 'uuid';
import { type ArticleBlockFormType } from '../../model/types/articleBlockForm';

export const formToArticleBlock = (
  form: ArticleBlockFormType,
  initialArticle?: ArticleBlock
): ArticleBlock => {
  const baseArticle = {
    id: initialArticle?.id ?? uuidV4(),
    name: form.name,
  };

  switch (form.type) {
    case ArticleBlockType.CODE:
      return {
        ...baseArticle,
        type: form.type,
        code: form.code,
      } satisfies ArticleCodeBlock;

    case ArticleBlockType.IMAGE:
      return {
        ...baseArticle,
        type: form.type,
        src: form.src,
        title: form.title,
      } satisfies ArticleImageBlock;

    case ArticleBlockType.TEXT:
      return {
        ...baseArticle,
        title: form.title,
        type: form.type,
        paragraphs: form.paragraphs,
      } satisfies ArticleTextBlock;
  }
};
