import { memo } from 'react';
import cls from './ArticleListItemSmall.module.scss';
import { classNames } from 'shared/lib';
import { type Article } from '../../../model/types/article';
import { Card, CardHoverAnimation, Icon, Text } from 'shared/ui';
import EyeSvg from '../../../../../../public/assets/icons/eye-20-20.svg';
import { Link } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config';

interface ArticleListItemSmallProps {
  className?: string
  article: Article
  isLoading?: boolean
}

const cardHoverAnimations = [CardHoverAnimation.SHADOW, CardHoverAnimation.SCALE_SMALL,];

export const ArticleListItemSmall = memo<ArticleListItemSmallProps>(
  function ArticleListItemSmall (props) {
    return (
      <Link to={RoutePath[AppRoutes.ARTICLE_DETAILS](props.article.id)}>
        <Card
          className={classNames(cls.ArticleListItemSmall, {}, [props.className,])}
          hoverAnimations={cardHoverAnimations}
        >
          <div className={cls.imageWrapper}>
            <img src={props.article.img} alt={props.article.title} className={cls.img}/>
            <Text text={props.article.createdAt} className={cls.date}/>
          </div>
          <div className={cls.infoWrapper}>
            <Text text={props.article.type.join(', ')} textClassName={cls.types}/>
            <Text text={String(props.article.views)} className={cls.views}/>
            <Icon Svg={EyeSvg}/>
          </div>
          <Text title={props.article.title} className={cls.title}/>
        </Card>
      </Link>
    );
  });
