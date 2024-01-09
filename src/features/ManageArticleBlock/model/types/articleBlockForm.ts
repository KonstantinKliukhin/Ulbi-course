import { type ArticleBlock } from '@/entities/Article';

export type ArticleBlockFormType = Exclude<ArticleBlock, 'id'>;
