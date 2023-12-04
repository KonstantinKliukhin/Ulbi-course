import {
  type FC,
  forwardRef,
  type HTMLAttributeAnchorTarget,
  memo,
  useMemo
} from 'react';
import { type Article, ArticleView } from '../../model/types/article';
import { ArticlesNotFound } from './ArticlesNotFound';
import cls from './ArticleList.module.scss';
import {
  type GridScrollSeekPlaceholderProps,
  VirtuosoGrid
} from 'react-virtuoso';
import { classNames } from 'shared/lib';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  error: string | null
  view?: ArticleView
  cardLinkTarget?: HTMLAttributeAnchorTarget
}

export const ArticleList = memo(
  forwardRef<HTMLElement | null, ArticleListProps>(function ArticleList (
    props,
    scrollElementRef
  ) {
    const view = props.view ?? ArticleView.SMALL;

    const skeletonsCount = useMemo<number>(() => {
      if (props.isLoading) {
        if (view === ArticleView.SMALL) {
          return 20;
        } else {
          return 4;
        }
      } else {
        return 0;
      }
    }, [props.isLoading, view,]);

    const totalCount = props.articles.length + skeletonsCount;

    if (!props.articles.length && !props.isLoading) {
      return <ArticlesNotFound />;
    }

    return (
      <VirtuosoGrid
        customScrollParent={
          scrollElementRef &&
          'current' in scrollElementRef &&
          scrollElementRef.current
            ? scrollElementRef.current
            : undefined
        }
        totalCount={totalCount}
        context={props.view}
        overscan={200}
        scrollSeekConfiguration={{
          enter: (velocity) => Math.abs(velocity) > 700,
          exit: (velocity) => Math.abs(velocity) < 30,
        }}
        components={{ ScrollSeekPlaceholder, }}
        listClassName={classNames(cls.ArticleList, {}, [cls[view],])}
        itemContent={(index) => {
          const article = props.articles[index];

          if (props.isLoading && !article) {
            return (
              <div className={cls.card}>
                <ArticleListItemSkeleton view={view} />
              </div>
            );
          } else {
            return (
              <div className={cls.card}>
                <ArticleListItem
                  article={article}
                  view={view}
                  cardLinkTarget={props.cardLinkTarget}
                />
              </div>
            );
          }
        }}
      />
    );
  })
);

const ScrollSeekPlaceholder: FC<
GridScrollSeekPlaceholderProps & { context?: ArticleView }
> = (props) => (
  <div style={{ height: props.height, }} className={cls.card}>
    <ArticleListItemSkeleton view={props.context ?? ArticleView.SMALL} />
  </div>
);
