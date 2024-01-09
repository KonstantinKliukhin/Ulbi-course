import { type Article } from '@/entities/Article';

export type ArticleFormType = Omit<Article, 'id' | 'views' | 'user' | 'createdAt'>;
