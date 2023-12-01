import { type ComponentProps, memo, type MouseEvent, type ReactNode, useCallback, useMemo } from 'react';
import { Card, Text } from 'shared/ui';
import { type ArticleBlock } from 'entities/Article';
import { classNames } from 'shared/lib';
import cls from './ArticleBlockCard.module.scss';

interface ArticleBlockCardProps extends Omit<ComponentProps<typeof Card>, 'children' | 'onClick'> {
  className?: string
  block: ArticleBlock
  children?: ReactNode
  onClick?: (block: ArticleBlock, event: MouseEvent<HTMLDivElement>) => void
}

export const ArticleBlockCard = memo<ArticleBlockCardProps>(function ArticleBlockCard (props) {
  const { block, onClick, className, ...cardProps } = props;

  const blockName = useMemo(() => {
    if (block.name) {
      return block.name;
    } else if ('title' in block && block.title) {
      return block.title;
    } else {
      return `${block.type}: ${block.id}`;
    }
  }, [block,]);

  const onCardClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    onClick?.(block, e);
  }, [block, onClick,]);

  return (
    <Card
      {...cardProps}
      className={classNames(cls.ArticleBlockCard, {}, [className,])}
      onClick={onCardClick}
    >
      <Text title={blockName}/>
      {props.children ?? null}
    </Card>
  );
});
