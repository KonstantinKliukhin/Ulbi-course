import type { User } from '@/entities/User/@x/article';
import type { ArticleBlockType } from '../../constants/articleBlockType';
import { type ArticleType } from '../../constants/articleType';

export interface ArticleTextBlockParagraph {
  id: string;
  text: string;
}

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
  name?: string;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  title?: string;
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  paragraphs: ArticleTextBlockParagraph[];
  title?: string;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export interface Article {
  id: string;
  user: User;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
  userId?: string;
}
