import { type ArticleSortField, type ArticleType } from '@/entities/Article';
import { type SortOrder } from '@/shared/types';

export interface ArticleQueryParams {
  limit: number;
  page: number;
  sort: ArticleSortField;
  order: SortOrder;
  search: string;
  type: ArticleType;
}
