import { type ArticleBlockType } from '../../constants/articleBlockType';
import { type ArticleType } from '../../constants/articleType';

export interface ArticleTextBlockParagraphDTO {
  id: string;
  text: string;
}

export interface ArticleBlockBaseDTO {
  id: string;
  type: ArticleBlockType;
  name?: string;
}

export interface ArticleCodeBlockDTO extends ArticleBlockBaseDTO {
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleImageBlockDTO extends ArticleBlockBaseDTO {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}

export interface ArticleTextBlockDTO extends ArticleBlockBaseDTO {
  type: ArticleBlockType.TEXT;
  paragraphs: ArticleTextBlockParagraphDTO[];
  title?: string;
}

export type ArticleBlockDTO =
  | ArticleCodeBlockDTO
  | ArticleImageBlockDTO
  | ArticleTextBlockDTO;

export interface ArticleDTO {
  userId: string;
  title: string;
  subtitle: string;
  img: string;
  type: ArticleType[];
  blocks: ArticleBlockDTO[];
}
