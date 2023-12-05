import { type ComponentProps, memo } from 'react';
import { Flex } from '../Flex/Flex';

type HStackProps = Omit<ComponentProps<typeof Flex>, 'direction'>;

export const HStack = memo<HStackProps>(function HStack (props) {
  return <Flex {...props} direction="row" />;
});
