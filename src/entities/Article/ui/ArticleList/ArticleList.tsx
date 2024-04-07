import { forwardRef, type HTMLAttributeAnchorTarget, memo } from 'react';
import { type Article } from '../../model/types/article';
import { ArticlesNotFound } from './ArticlesNotFound';
import { VirtualizedArticlesList } from './VirtualizedArticlesList/VirtualizedArticlesList';
import { CommonArticlesList } from './CommonArticlesList/CommonArticlesList';
import { type ListRange } from 'react-virtuoso';
import { ArticleView } from '../../constants/articleView';

interface ArticleListProps {
  articles: Article[];
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  view?: ArticleView;
  cardLinkTarget?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
  endReached?: () => void;
  startReached?: () => void;
  skeletonsCount?: number;
  savedItemIndex?: number;
  onScrollRangeChanged?: (state: ListRange) => void;
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
          savedItemIndex={props.savedItemIndex}
          onScrollRangeChanged={props.onScrollRangeChanged}
          ref={scrollElementRef}
          className={props.className}
          skeletonsCount={props.skeletonsCount}
          isLoading={props.isLoading}
          view={view}
          articles={props.articles}
          error={props.error}
          cardLinkTarget={props.cardLinkTarget}
          startReached={props.startReached}
          endReached={props.endReached}
        />
      );
    } else {
      return (
        <CommonArticlesList
          skeletonsCount={props.skeletonsCount ?? 0}
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
