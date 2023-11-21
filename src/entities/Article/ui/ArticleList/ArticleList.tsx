import { memo } from 'react';
import cls from './ArticleList.module.scss';
import { classNames } from 'shared/lib';
import { type Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListSkeleton } from './ArticleListSkeleton';
import { Text, TextAlign, TextTheme } from 'shared/ui';

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  error: string | null
  view?: ArticleView
}

export const ArticleList = memo<ArticleListProps>(
  function ArticleList (props) {
    const view = props.view ?? ArticleView.BIG;

    return (
      <div className={classNames(cls.ArticleList, {}, [props.className, cls[view],])}>
        {props.articles.length > 0
          ? props.articles.map(article => (
            <ArticleListItem view={view} article={article} key={article.id}/>)
          )
          : null
                }
        {props.isLoading ? <ArticleListSkeleton view={view}/> : null}
        {props.error ? <Text theme={TextTheme.ERROR} title={props.error} align={TextAlign.CENTER}/> : null}
      </div>
    );
  });
