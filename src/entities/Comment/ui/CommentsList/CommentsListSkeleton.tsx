import React from 'react';
import cls from './CommentList.module.scss';
import { CommentCardSkeleton } from '../CommentCard/CommentCardSkeleton';

export const CommentsListSkeleton = () => (
  <div className={cls.CommentsList}>
    {Array(4).fill(null).map((_, index) => <CommentCardSkeleton key={index}/>)}
  </div>
);
