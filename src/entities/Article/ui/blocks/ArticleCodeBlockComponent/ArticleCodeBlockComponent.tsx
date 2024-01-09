import { memo } from 'react';
import { type ArticleCodeBlock } from '../../../model/types/article';
import { Code } from '@/shared/ui';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo<ArticleCodeBlockComponentProps>(
  function ArticleCodeBlockComponent (props) {
    return (
      <Code className={props.className} text={props.block.code}/>
    );
  }
);
