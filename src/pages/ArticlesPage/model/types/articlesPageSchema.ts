import { type Article, type ArticleSortField, type ArticleType, type ArticleView } from '@/entities/Article';
import { type EntityState } from '@reduxjs/toolkit';
import { type SortOrder } from '@/shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading: boolean;
  error: null | string;
  view: ArticleView;
  type: ArticleType;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;

  // filters
  order: SortOrder;
  sort: ArticleSortField;
  search: string;

  // virtuoso scroll state
  saveItemIndex: number;

  // meta
  _inited: boolean;
}
