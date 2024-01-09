import React from 'react';
import { CommentCardSkeleton } from '../CommentCard/CommentCardSkeleton';

export const CommentsListSkeleton = () => (
  <>
    {new Array(4)
      .fill(null)
      .map((_, index) => <CommentCardSkeleton key={index} />)
    }
  </>
);
