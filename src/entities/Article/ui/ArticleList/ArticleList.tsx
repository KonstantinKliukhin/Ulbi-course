import { forwardRef, type HTMLAttributeAnchorTarget, memo } from 'react';
import { type Article, ArticleView } from '../../model/types/article';
import { ArticlesNotFound } from './ArticlesNotFound';
import { VirtualizedArticlesList } from './VirtualizedArticlesList/VirtualizedArticlesList';
import { CommonArticlesList } from './CommonArticlesList/CommonArticlesList';

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  error: string | null
  view?: ArticleView
  cardLinkTarget?: HTMLAttributeAnchorTarget
  virtualized?: boolean
}

export const ArticleList = memo(
  forwardRef<HTMLElement | null, ArticleListProps>(function ArticleList (
    props,
    scrollElementRef
  ) {
    const view = props.view ?? ArticleView.SMALL;

    if (!props.articles.length && !props.isLoading) {
      return <ArticlesNotFound />;
    }

    if (props.virtualized) {
      return (
        <VirtualizedArticlesList
          ref={scrollElementRef}
          className={props.className}
          view={view}
          articles={props.articles}
          isLoading={props.isLoading}
          error={props.error}
          cardLinkTarget={props.cardLinkTarget}
        />
      );
    } else {
      return (
        <CommonArticlesList
          className={props.className}
          view={view}
          articles={props.articles}
          isLoading={props.isLoading}
          error={props.error}
          cardLinkTarget={props.cardLinkTarget}
        />
      );
    }
  })
);
