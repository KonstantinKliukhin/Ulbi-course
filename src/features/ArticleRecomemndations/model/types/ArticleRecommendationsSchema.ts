import { type Article } from 'entities/Article';
import { type EntityState } from '@reduxjs/toolkit';

export interface ArticleRecommendationsSchema extends EntityState<Article> {
  isLoading: boolean
  error: null | string
}
