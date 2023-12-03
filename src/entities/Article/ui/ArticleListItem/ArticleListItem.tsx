import { type FC, type HTMLAttributeAnchorTarget } from 'react';
import { type Article, ArticleView } from '../../model/types/article';
import { ArticleListItemBig } from './ArticleListItemBig/ArticleListItemBig';
import { ArticleListItemSmall } from './ArticleListItemSmall/ArticleListItemSmall';

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
  cardLinkTarget?: HTMLAttributeAnchorTarget
}

export const ArticleListItem: FC<ArticleListItemProps> = (props) => {
  if (props.view === ArticleView.BIG) {
    return (
      <ArticleListItemBig
        className={props.className}
        article={props.article}
        cardLinkTarget={props.cardLinkTarget}
      />
    );
  }

  if (props.view === ArticleView.SMALL) {
    return (
      <ArticleListItemSmall
        className={props.className}
        article={props.article}
        cardLinkTarget={props.cardLinkTarget}
      />
    );
  }
};
