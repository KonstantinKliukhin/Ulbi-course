import {
  type ComponentProps,
  memo,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useMemo
} from 'react';
import { Card, HStack, Text } from 'shared/ui';
import { type ArticleBlock } from '../../model/types/article';

interface ArticleBlockCardProps
  extends Omit<ComponentProps<typeof Card>, 'children' | 'onClick'> {
  block: ArticleBlock
  children?: ReactNode
  onClick?: (block: ArticleBlock, event: MouseEvent<HTMLDivElement>) => void
}

export const ArticleBlockCard = memo<ArticleBlockCardProps>(
  function ArticleBlockCard (props) {
    const { block, onClick, ...cardProps } = props;

    const blockName = useMemo(() => {
      if (block.name) {
        return block.name;
      } else if ('title' in block && block.title) {
        return block.title;
      } else {
        return `${block.type}: ${block.id}`;
      }
    }, [block,]);

    const onCardClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        onClick?.(block, e);
      },
      [block, onClick,]
    );

    return (
      <Card {...cardProps} onClick={onCardClick}>
        <HStack justify="between" align="center">
          <Text title={blockName} />
          {props.children ?? null}
        </HStack>
      </Card>
    );
  }
);
