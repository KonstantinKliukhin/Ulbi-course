import { type Comment } from 'entities/Comment';
import { type EntityState } from '@reduxjs/toolkit';

export interface ArticleCommentsSchema extends EntityState<Comment> {
  isLoading: boolean
  error: null | string
}
