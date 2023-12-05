import { type HTMLAttributeAnchorTarget, memo } from 'react';
import { ArticleListSkeleton } from './ArticleListSkeleton';
import { type Article, ArticleView } from '../../../model/types/article';
import { ArticleListItem } from '../../ArticleListItem/ArticleListItem';
import { Flex } from 'shared/ui';
import cls from './CommonArticlesList.module.scss';
import { classNames } from 'shared/lib';

interface CommonArticlesListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  error: string | null
  view: ArticleView
  cardLinkTarget?: HTMLAttributeAnchorTarget
}

export const CommonArticlesList = memo<CommonArticlesListProps>(
  function CommonArticlesList (props) {
    const isBig = props.view === ArticleView.BIG;
    return (
      <Flex
        direction={isBig ? 'column' : 'row'}
        xGap={isBig ? undefined : 16}
        yGap={isBig ? 32 : 16}
        className={classNames(cls.CommonArticlesList, {}, [props.className,])}
        align="start"
      >
        {props.articles.map((article) => (
          <ArticleListItem
            key={article.id}
            article={article}
            view={props.view}
            cardLinkTarget={props.cardLinkTarget}
          />
        ))}
        {props.isLoading ? <ArticleListSkeleton view={props.view} /> : null}
      </Flex>
    );
  }
);
