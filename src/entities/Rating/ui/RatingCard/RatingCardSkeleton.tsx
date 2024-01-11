import { type FC } from 'react';
import { Card, Skeleton, VStack } from '@/shared/ui';

export const RatingCardSkeleton: FC = () => (
  <Card>
    <VStack align="center" yGap={8}>
      <Skeleton height={32} width={300} />
      <Skeleton height={40} width={220} />
    </VStack>
  </Card>
);
