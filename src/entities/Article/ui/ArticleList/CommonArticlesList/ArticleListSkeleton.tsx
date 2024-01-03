import { type FC } from 'react';
import { type ArticleView } from '../../../model/types/article';
import { ArticleListItemSkeleton } from '../../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListSkeletonProps {
  view: ArticleView;
  skeletonsCount: number;
  className?: string;
}

export const ArticleListSkeleton: FC<ArticleListSkeletonProps> = (props) => (
  Array(props.skeletonsCount)
    .fill(null)
    .map((_, i) => <ArticleListItemSkeleton key={i} className={props.className} view={props.view} />)
);
