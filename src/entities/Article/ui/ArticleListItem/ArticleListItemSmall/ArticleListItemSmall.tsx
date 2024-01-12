import {
  type ComponentProps,
  type HTMLAttributeAnchorTarget,
  memo
} from 'react';
import cls from './ArticleListItemSmall.module.scss';
import { classNames } from '@/shared/lib';
import { type Article } from '../../../model/types/article';
import { AppImage, Card, Icon, Skeleton, Text } from '@/shared/ui';
import { EyeIcon } from '@/shared/assets';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/shared/config';

interface ArticleListItemSmallProps {
  className?: string;
  article: Article;
  isLoading?: boolean;
  cardLinkTarget?: HTMLAttributeAnchorTarget;
}

const cardHoverAnimations: ComponentProps<typeof Card>['hoverAnimations'] = [
  'hover-shadow',
  'hover-scale-small',
];

export const ArticleListItemSmall = memo<ArticleListItemSmallProps>(
  function ArticleListItemSmall (props) {
    return (
      <Link
        className={cls.wrapper}
        to={RoutePath.articleDetails(props.article.id)}
        target={props.cardLinkTarget}
      >
        <Card
          className={classNames(cls.ArticleListItemSmall, {}, [
            props.className,
          ])}
          hoverAnimations={cardHoverAnimations}
        >
          <div className={cls.imageWrapper}>
            <AppImage
              src={props.article.img}
              fallback={<Skeleton width={200} height={200} />}
              alt={props.article.title}
              className={cls.img}
            />
            <Text text={props.article.createdAt} className={cls.date} />
          </div>
          <div className={cls.infoWrapper}>
            <Text
              text={props.article.type.join(', ')}
              textClassName={cls.types}
            />
            <Text text={String(props.article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
          </div>
          <Text title={props.article.title} titleClassName={cls.title} />
        </Card>
      </Link>
    );
  }
);
