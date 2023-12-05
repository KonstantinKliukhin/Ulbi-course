import { type ComponentProps, memo } from 'react';
import { Flex } from '../Flex/Flex';

type VStackProps = Omit<ComponentProps<typeof Flex>, 'direction'>;

export const VStack = memo<VStackProps>(function VStack (props) {
  return <Flex {...props} direction="column" />;
});
