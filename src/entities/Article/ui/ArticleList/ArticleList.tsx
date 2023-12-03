import { type HTMLAttributeAnchorTarget, memo, useRef } from 'react';
import { type Article, ArticleView } from '../../model/types/article';
import { ArticlesNotFound } from './ArticlesNotFound';
import { List, type ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID, Text, TextAlign, TextTheme } from 'shared/ui';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { classNames } from 'shared/lib';
import cls from './ArticleList.module.scss';
import { ArticleListSkeleton } from './ArticleListSkeleton';
import { useSmallItemsPerRow } from './hooks/useSmallItemsPerRow';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  error: string | null
  view?: ArticleView
  cardLinkTarget?: HTMLAttributeAnchorTarget
}

const SMALL_ITEMS_GAP = 30;
const SMALL_ITEMS_WIDTH = 230;
const SMALL_ITEM_HEIGHT = 330;
const SMALL_ITEMS_WIDTH_WITH_GAP = SMALL_ITEMS_WIDTH + SMALL_ITEMS_GAP;
const SMALL_ITEMS_HEIGHT_WITH_GAP = SMALL_ITEM_HEIGHT + SMALL_ITEMS_GAP;

const BIG_ITEMS_HEIGHT = 640;
const BIG_ITEMS_GAP = 30;
const BIG_ITEMS_HEIGHT_WITH_GAP = BIG_ITEMS_HEIGHT + BIG_ITEMS_GAP;
const BIG_ITEMS_PER_ROW = 1;

const PAGE_PADDING = 40;

export const ArticleList = memo<ArticleListProps>(function ArticleList (props) {
  const view = props.view ?? ArticleView.BIG;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const smallItemsPerRow = useSmallItemsPerRow(
    wrapperRef,
    SMALL_ITEMS_WIDTH_WITH_GAP
  );

  const isBig = view === ArticleView.BIG;

  const itemsPerRow = isBig ? BIG_ITEMS_PER_ROW : smallItemsPerRow;

  const rowCount = isBig
    ? props.articles.length
    : Math.ceil(props.articles.length / itemsPerRow);

  const rowRenderer = ({ index, key, style, }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = fromIndex + itemsPerRow;

    for (let i = fromIndex; i < toIndex; i++) {
      if (props.articles[i]) {
        items.push(
          <ArticleListItem
            className={cls.card}
            article={props.articles[i]}
            view={view}
            key={props.articles[i].id}
          />
        );
      } else if (props.isLoading) {
        items.push(<ArticleListItemSkeleton view={view} />);
      }
    }

    return (
      <div key={key} style={style} className={cls.row}>
        {items}
      </div>
    );
  };

  if (!props.articles.length && !props.isLoading) {
    return (
      <div ref={wrapperRef}>
        <ArticlesNotFound />
      </div>
    );
  }

  return (
    <div ref={wrapperRef}>
      <WindowScroller
        scrollElement={document.getElementById(PAGE_ID) as Element}
      >
        {({
          height,
          width,
          registerChild,
          scrollTop,
          onChildScroll,
          isScrolling,
        }) => (
          <div
            ref={registerChild as unknown as any}
            className={classNames(cls.ArticleList, {}, [
              props.className,
              cls[view],
            ])}
          >
            <List
              autoHeight
              onScroll={onChildScroll}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
              rowCount={rowCount}
              height={height}
              rowHeight={
                isBig ? BIG_ITEMS_HEIGHT_WITH_GAP : SMALL_ITEMS_HEIGHT_WITH_GAP
              }
              rowRenderer={rowRenderer}
              width={width - PAGE_PADDING}
            />
            {props.isLoading ? <ArticleListSkeleton view={view} /> : null}
          </div>
        )}
      </WindowScroller>
      {props.error
        ? (
          <Text
            theme={TextTheme.ERROR}
            title={props.error}
            align={TextAlign.CENTER}
          />
          )
        : null}
    </div>
  );
});
