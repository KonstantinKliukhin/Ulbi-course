import { createEntityAdapter } from '@reduxjs/toolkit';
import { type Article } from '@/entities/Article';

export const articlesAdapter = createEntityAdapter<Article>({
  selectId: article => article.id,
});
