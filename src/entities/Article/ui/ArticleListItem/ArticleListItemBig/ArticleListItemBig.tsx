import { type FC, type HTMLAttributeAnchorTarget, memo, useMemo } from 'react';
import cls from './ArticleListItemBig.module.scss';
import { classNames } from 'shared/lib';
import { type Article, ArticleBlockType, type ArticleTextBlock } from '../../../model/types/article';
import { Avatar, Button, ButtonTheme, Card, CardHoverAnimation, Icon, Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import EyeSvg from '../../../../../../public/assets/icons/eye-20-20.svg';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { Link } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config';

interface ArticleListItemBigProps {
  className?: string
  article: Article
  cardLinkTarget?: HTMLAttributeAnchorTarget
}

const cardHoverAnimations = [CardHoverAnimation.SHADOW,];

export const ArticleListItemBig: FC<ArticleListItemBigProps> = memo<ArticleListItemBigProps>(
  function ArticleListItemBig (props) {
    const { t, } = useTranslation('article');

    const textBlock = useMemo(() => props.article.blocks.find(block => (
      block.type === ArticleBlockType.TEXT
    )) as ArticleTextBlock | undefined, [props.article.blocks,]);

    return (
      <Card
        hoverAnimations={cardHoverAnimations}
        className={classNames(cls.ArticleListItemBig, {}, [props.className,])}
      >
        <Text text={props.article.createdAt} className={cls.date}/>
        <div className={cls.header}>
          <Avatar src={props.article.user.avatar} size={30}/>
          <Text text={props.article.user.username}/>
          <Text text={props.article.createdAt} className={cls.date}/>
        </div>
        <Text title={props.article.title} className={cls.title}/>
        <Text text={props.article.type.join(', ')} textClassName={cls.types}/>
        <img src={props.article.img} className={cls.img} alt={props.article.title}/>
        {textBlock ? <ArticleTextBlockComponent className={cls.textBlock} block={textBlock}/> : null}
        <div className={cls.footer}>
          <Link to={RoutePath[AppRoutes.ARTICLE_DETAILS](props.article.id)} target={props.cardLinkTarget}>
            <Button theme={ButtonTheme.OUTLINE}>
              {t('read_more')}
            </Button>
          </Link>

          <div className={cls.viewsWrapper}>
            <Text text={String(props.article.views)} className={cls.views}/>
            <Icon Svg={EyeSvg}/>
          </div>
        </div>
      </Card>

    );
  });
