import { type FC } from 'react';
import cls from './ArticleList.module.scss';
import { classNames } from 'shared/lib';
import { ArticleView } from 'entities/Article';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';

interface ArticleListSkeletonProps {
  view: ArticleView
}

export const ArticleListSkeleton: FC<ArticleListSkeletonProps> = props => {
  const isBig = props.view === ArticleView.BIG;

  const content = Array(isBig ? 3 : 16).fill(null).map((_, i) => (
    <ArticleListItemSkeleton key={i} view={props.view}/>
  ));

  return (
    <div className={classNames(cls.ArticleList, {}, [cls[props.view],])}>
      {content}
    </div>
  );
};
