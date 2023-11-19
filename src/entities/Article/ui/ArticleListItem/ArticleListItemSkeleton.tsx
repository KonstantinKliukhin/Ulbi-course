import { type FC } from 'react';
import { ArticleView } from '../../model/types/article';
import { ArticleListItemSmallSkeleton } from './ArticleListItemSmall/ArticleListItemSmallSkeleton';
import { ArticleListItemBigSkeleton } from './ArticleListItemBig/ArticleListItemBigSkeleton';

interface ArticleListItemSkeletonProps {
  view: ArticleView
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = props => {
  if (props.view === ArticleView.BIG) return <ArticleListItemBigSkeleton/>;
  if (props.view === ArticleView.SMALL) return <ArticleListItemSmallSkeleton/>;
};
