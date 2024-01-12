import {
  type ComponentProps,
  type FC,
  type HTMLAttributeAnchorTarget,
  memo,
  useMemo
} from 'react';
import cls from './ArticleListItemBig.module.scss';
import { classNames } from '@/shared/lib';
import {
  type Article,
  ArticleBlockType,
  type ArticleTextBlock
} from '../../../model/types/article';
import { Avatar, Button, Card, HStack, Icon, Text, AppImage, Skeleton } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { EyeIcon } from '@/shared/assets';
import { ArticleTextBlockComponent } from '../../blocks/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/shared/config';

interface ArticleListItemBigProps {
  className?: string;
  article: Article;
  cardLinkTarget?: HTMLAttributeAnchorTarget;
}

const cardHoverAnimations: ComponentProps<typeof Card>['hoverAnimations'] = [
  'hover-shadow',
];

export const ArticleListItemBig: FC<ArticleListItemBigProps> =
  memo<ArticleListItemBigProps>(function ArticleListItemBig (props) {
    const { t, } = useTranslation('article');

    const textBlock = useMemo(
      () =>
        props.article.blocks.find(
          (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock | undefined,
      [props.article.blocks,]
    );

    return (
      <Card
        hoverAnimations={cardHoverAnimations}
        className={classNames(cls.ArticleListItemBig, {}, [props.className,])}
      >
        <Text text={props.article.createdAt} className={cls.date} />
        <HStack align="center" xGap={8}>
          <Avatar src={props.article.user.avatar} size={30} />
          <Text text={props.article.user.username} />
          <Text text={props.article.createdAt} className={cls.date} />
        </HStack>
        <Text title={props.article.title} className={cls.title} />
        <Text text={props.article.type.join(', ')} textClassName={cls.types} />
        <AppImage
          src={props.article.img}
          fallback={<Skeleton width="100%" height={250} />}
          className={cls.img}
          alt={props.article.title}
        />
        {textBlock
          ? (
            <ArticleTextBlockComponent
              className={cls.textBlock}
              block={textBlock}
            />
            )
          : null}
        <HStack align="center" justify="between" className={cls.footer}>
          <Link
            to={RoutePath.articleDetails(props.article.id)}
            target={props.cardLinkTarget}
          >
            <Button theme="outline">{t('read_more')}</Button>
          </Link>

          <HStack align="center" xGap={8}>
            <Text text={String(props.article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
          </HStack>
        </HStack>
      </Card>
    );
  });
