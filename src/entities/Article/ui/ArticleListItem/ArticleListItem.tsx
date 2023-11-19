import { type FC } from 'react';
import { type Article, ArticleView } from '../../model/types/article';
import { ArticleListItemBig } from './ArticleListItemBig/ArticleListItemBig';
import { ArticleListItemSmall } from './ArticleListItemSmall/ArticleListItemSmall';

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
}

export const ArticleListItem: FC<ArticleListItemProps> = props => {
  if (props.view === ArticleView.BIG) return <ArticleListItemBig article={props.article}/>;

  if (props.view === ArticleView.SMALL) return <ArticleListItemSmall article={props.article}/>;
};
