import { type FC } from 'react';
import { ArticleView } from '../../../model/types/article';
import { ArticleListItemSkeleton } from '../../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListSkeletonProps {
  view: ArticleView
}

export const ArticleListSkeleton: FC<ArticleListSkeletonProps> = (props) => {
  const isBig = props.view === ArticleView.BIG;

  return Array(isBig ? 4 : 20)
    .fill(null)
    .map((_, i) => <ArticleListItemSkeleton key={i} view={props.view} />);
};
