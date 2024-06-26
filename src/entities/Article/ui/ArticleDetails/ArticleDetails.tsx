import { type FC, useCallback } from 'react';
import cls from './ArticleDetails.module.scss';
import { classNames } from '@/shared/lib';
import { AsyncContainer, Avatar, HStack, Icon, Text } from '@/shared/ui';
import { ArticleDetailsSkeleton } from '../ArticleDetails/ArticleDetailsSkeleton/ArticleDetailsSkeleton';
import { EyeIcon, CalendarIcon } from '@/shared/assets';
import { type Article, type ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../blocks/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../blocks/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../blocks/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlockType } from '../../constants/articleBlockType';

interface ArticleDetailsProps {
  className?: string;
  article?: Article;
  error?: null | string;
  isLoading: boolean;
}

export const ArticleDetails: FC<ArticleDetailsProps> = (props) => {
  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            className={cls.block}
            block={block}
            key={block.id}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            className={cls.block}
            block={block}
            key={block.id}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            className={cls.block}
            block={block}
            key={block.id}
          />
        );
    }
  }, []);

  return (
    <div
      className={classNames(cls.ArticleDetails, {}, [props.className,])}
      data-testid="ArticleDetails"
    >
      <AsyncContainer isLoading={props.isLoading} error={props.error} loadingNode={<ArticleDetailsSkeleton/>}>
        <Avatar size={200} src={props.article?.img} className={cls.avatar} />
        <Text
          data-testid="ArticleDetails"
          size="l"
          title={props.article?.title}
          text={props.article?.subtitle}
        />
        <HStack align="start" xGap={16} className={cls.metaLine}>
          <Icon Svg={EyeIcon} />
          <Text data-testid="ArticleDetails.Views" text={String(props.article?.views)} />
        </HStack>
        <HStack align="start" xGap={16} className={cls.metaLine}>
          <Icon Svg={CalendarIcon} />
          <Text data-testid="ArticleDetails.Created" text={props.article?.createdAt} />
        </HStack>
        {props.article?.blocks.map(renderBlock)}
      </AsyncContainer>
    </div>
  );
};
