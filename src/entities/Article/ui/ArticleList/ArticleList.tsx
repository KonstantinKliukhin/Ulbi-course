import { memo } from 'react';
import cls from './ArticleList.module.scss';
import { classNames } from 'shared/lib';
import { type Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListSkeleton } from 'entities/Article/ui/ArticleList/ArticleListSkeleton';

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
}

export const ArticleList = memo<ArticleListProps>(function ArticleList (props) {
  const view = props.view ?? ArticleView.BIG;

  if (props.isLoading) return <ArticleListSkeleton view={view}/>;

  return (
    <div className={classNames(cls.ArticleList, {}, [props.className, cls[view],])}>
      {props.articles.length > 0
        ? props.articles.map(article => (
          <ArticleListItem view={view} article={article} key={article.id}/>)
        )
        : null
            }
    </div>
  );
});
