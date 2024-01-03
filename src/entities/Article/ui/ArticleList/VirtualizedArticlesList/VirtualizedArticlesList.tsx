import {
  type FC,
  forwardRef,
  type HTMLAttributeAnchorTarget,
  memo
} from 'react';
import { type Article, ArticleView } from '../../../model/types/article';
import cls from './VirtualizedArticlesList.module.scss';
import {
  type GridScrollSeekPlaceholderProps, type ListRange,
  VirtuosoGrid
} from 'react-virtuoso';
import { classNames } from 'shared/lib';
import { ArticleListItem } from '../../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../../ArticleListItem/ArticleListItemSkeleton';

interface VirtualizedArticlesListProps {
  className?: string;
  articles: Article[];
  error?: string | null;
  view: ArticleView;
  cardLinkTarget?: HTMLAttributeAnchorTarget;
  skeletonsCount?: number;
  endReached?: () => void;
  startReached?: () => void;
  isLoading?: boolean;
  savedItemIndex?: number;
  onScrollRangeChanged?: (state: ListRange) => void;
}

export const VirtualizedArticlesList = memo(
  forwardRef<HTMLElement | null, VirtualizedArticlesListProps>(
    function ArticleList (props, scrollElementRef) {
      const skeletonsCount = props.skeletonsCount && props.isLoading ? props.skeletonsCount : 0;
      const totalCount = skeletonsCount + props.articles.length;

      return (
        <VirtuosoGrid
          customScrollParent={
            scrollElementRef &&
            'current' in scrollElementRef &&
            scrollElementRef.current
              ? scrollElementRef.current
              : undefined
          }
          initialTopMostItemIndex={props.savedItemIndex ?? 0}
          rangeChanged={props.onScrollRangeChanged}
          totalCount={totalCount}
          context={props.view}
          overscan={200}
          scrollSeekConfiguration={{
            enter: (velocity) => Math.abs(velocity) > 700,
            exit: (velocity) => Math.abs(velocity) < 30,
          }}
          components={{ ScrollSeekPlaceholder, }}
          listClassName={classNames(cls.ArticleList, {}, [
            cls[props.view],
            props.className,
          ])}
          endReached={props.endReached}
          startReached={props.startReached}
          itemContent={(index) => {
            const article = props.articles[index];
            const isEndSkeleton =
              index > totalCount - skeletonsCount - 1 || !article;

            if (isEndSkeleton) {
              return (
                <div className={cls.card}>
                  <ArticleListItemSkeleton view={props.view} />
                </div>
              );
            } else {
              return (
                <div className={cls.card}>
                  <ArticleListItem
                    article={article}
                    view={props.view}
                    cardLinkTarget={props.cardLinkTarget}
                  />
                </div>
              );
            }
          }}
        />
      );
    }
  )
);

const ScrollSeekPlaceholder: FC<
GridScrollSeekPlaceholderProps & { context?: ArticleView }
> = (props) => (
  <div style={{ height: props.height, }} className={cls.card}>
    <ArticleListItemSkeleton view={props.context ?? ArticleView.SMALL} />
  </div>
);
