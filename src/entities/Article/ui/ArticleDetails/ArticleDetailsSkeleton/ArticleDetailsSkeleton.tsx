import { type FC } from 'react';
import { Skeleton, VStack } from '@/shared/ui';

export const ArticleDetailsSkeleton: FC = () => (
  <VStack yGap={16} align="start">
    <Skeleton height={200}
      width={200}
      borderRadius="50%"
      centered
    />
    <Skeleton height={32} width={300} />
    <Skeleton height={24} width={600} />
    <Skeleton height={200} width="100%" />
    <Skeleton height={200} width="100%" />
  </VStack>
);
