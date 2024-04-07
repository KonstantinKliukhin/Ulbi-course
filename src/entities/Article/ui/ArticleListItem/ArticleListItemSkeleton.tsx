import { type FC } from 'react';
import { ArticleListItemSmallSkeleton } from './ArticleListItemSmall/ArticleListItemSmallSkeleton';
import { ArticleListItemBigSkeleton } from './ArticleListItemBig/ArticleListItemBigSkeleton';
import { ArticleView } from '../../constants/articleView';

interface ArticleListItemSkeletonProps {
  view: ArticleView;
  className?: string;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = (
  props
) => {
  if (props.view === ArticleView.BIG) {
    return <ArticleListItemBigSkeleton className={props.className} />;
  }
  if (props.view === ArticleView.SMALL) {
    return <ArticleListItemSmallSkeleton className={props.className} />;
  }
};
