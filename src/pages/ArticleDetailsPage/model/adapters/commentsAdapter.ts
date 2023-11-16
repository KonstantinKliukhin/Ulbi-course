import { createEntityAdapter } from '@reduxjs/toolkit';
import { type Comment } from 'entities/Comment';

export const commentsAdapter = createEntityAdapter<Comment>({
  selectId: comment => comment.id,
});
