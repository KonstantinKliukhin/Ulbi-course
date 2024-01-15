import {
  type ComponentProps,
  memo,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useMemo
} from 'react';
import { Card, HStack, Text } from '@/shared/ui';
import { type ArticleBlock, ArticleBlockType } from '../../model/types/article';

interface ArticleBlockCardProps
  extends Omit<ComponentProps<typeof Card>, 'children' | 'onClick'> {
  block: ArticleBlock;
  children?: ReactNode;
  onClick?: (block: ArticleBlock, event: MouseEvent<HTMLDivElement>) => void;
}

export const ArticleBlockCard = memo<ArticleBlockCardProps>(
  function ArticleBlockCard (props) {
    const { block, onClick, ...cardProps } = props;

    const blockName = useMemo(() => {
      if (block.name) {
        return block.name;
      } else if (block.title) {
        return block.title;
      } else {
        switch (block.type) {
          case ArticleBlockType.TEXT:
            return `${block.type}: ${block.paragraphs[0]?.text}`;

          case ArticleBlockType.IMAGE:
            return `${block.type}: ${block.src}`;

          case ArticleBlockType.CODE:
            return `${block.type}: ${block.code}`;

          default:
            return '' as never;
        }
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
          <Text title={blockName} ellipsis />
          {props.children ?? null}
        </HStack>
      </Card>
    );
  }
);
