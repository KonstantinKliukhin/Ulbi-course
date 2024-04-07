import { type FC } from 'react';
import { ArticleListItemSkeleton } from '../../ArticleListItem/ArticleListItemSkeleton';
import { type ArticleView } from '../../../constants/articleView';

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
