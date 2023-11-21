import { type Article, type ArticleView } from 'entities/Article';
import { type EntityState } from '@reduxjs/toolkit';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading: boolean
  error: null | string
  view: ArticleView
  page: number
  limit: number
  hasMore: boolean
  _inited: boolean
}
