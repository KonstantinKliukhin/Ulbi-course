import React from 'react';
import cls from './CommentList.module.scss';
import { CommentCardSkeleton } from '../CommentCard/CommentCardSkeleton';

export const CommentsListSkeleton = () => (
  <div className={cls.CommentsList}>
    <CommentCardSkeleton/>
    <CommentCardSkeleton/>
    <CommentCardSkeleton/>
    <CommentCardSkeleton/>
  </div>
);
