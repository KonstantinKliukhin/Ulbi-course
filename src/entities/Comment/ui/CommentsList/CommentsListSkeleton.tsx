import React from 'react';
import { CommentCardSkeleton } from '../CommentCard/CommentCardSkeleton';
import { VStack } from 'shared/ui';

export const CommentsListSkeleton = () => (
  <VStack align="start" yGap={16}>
    <CommentCardSkeleton />
    <CommentCardSkeleton />
    <CommentCardSkeleton />
    <CommentCardSkeleton />
  </VStack>
);
