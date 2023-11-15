import { memo } from 'react';
import cls from './ArticleTextBlockComponent.module.scss';
import { classNames } from 'shared/lib';
import { type ArticleTextBlock } from 'entities/Article';
import { Text } from 'shared/ui';

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo<ArticleTextBlockComponentProps>(
  function ArticleTextBlockComponentProps (props) {
    return (
      <div className={classNames(cls.ArticleTextBlockComponent, {}, [props.className,])}>
        {props.block.title ? <Text title={props.block.title} className={cls.title}/> : null}
        {props.block.paragraphs.map((paragraph, index) => (
          <Text text={paragraph} key={index}/>
        ))}
      </div>
    );
  }
);
