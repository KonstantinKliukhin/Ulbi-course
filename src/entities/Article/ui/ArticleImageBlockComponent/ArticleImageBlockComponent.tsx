import { memo } from 'react';
import cls from './ArticleImageBlockComponent.module.scss';
import { classNames } from 'shared/lib';
import { type ArticleImageBlock } from '../../model/types/article';
import { Text, TextAlign } from 'shared/ui';

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo<ArticleImageBlockComponentProps>(
  function ArticleImageBlockComponent (props) {
    return (
      <div className={classNames(cls.ArticleImageBlockComponent, {}, [props.className,])}>
        <img className={cls.image} src={props.block.src} alt={props.block.title}/>
        {props.block.title ? <Text title={props.block.title} align={TextAlign.CENTER}/> : null}
      </div>
    );
  }
);
