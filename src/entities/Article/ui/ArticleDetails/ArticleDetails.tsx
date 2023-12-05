import { type FC, type ReactNode, useCallback } from 'react';
import cls from './ArticleDetails.module.scss';
import {
  classNames,
  useAppDispatch,
  useAppSelector,
  useInitialEffect,
  withLazySlices
} from 'shared/lib';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/getArticleDetails/getArticleDetails';
import { Avatar, HStack, Icon, Text } from 'shared/ui';
import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice';
import { ArticleDetailsSkeleton } from '../ArticleDetails/ArticleDetailsSkeleton/ArticleDetailsSkeleton';
import EyeIcon from '../../../../../public/assets/icons/eye-20-20.svg';
import CalendarIcon from '../../../../../public/assets/icons/calendar-20-20.svg';
import { type ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../blocks/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../blocks/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../blocks/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';

interface ArticleDetailsProps {
  className?: string
  id: string
}

const ArticleDetails: FC<ArticleDetailsProps> = (props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getArticleDetailsIsLoading);
  const error = useAppSelector(getArticleDetailsError);
  const article = useAppSelector(getArticleDetailsData);

  useInitialEffect(
    useCallback(() => {
      void dispatch(fetchArticleById(props.id));
    }, [props.id, dispatch,])
  );

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

  let content: ReactNode;

  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = <Text theme="error" align="center" title={error} />;
  } else {
    content = (
      <>
        <Avatar size={200} src={article?.img} className={cls.avatar} />
        <Text size="l" title={article?.title} text={article?.subtitle} />
        <HStack align="start" xGap={16} className={cls.metaLine}>
          <Icon Svg={EyeIcon} />
          <Text text={String(article?.views)} />
        </HStack>
        <HStack align="start" xGap={16} className={cls.metaLine}>
          <Icon Svg={CalendarIcon} />
          <Text text={article?.createdAt} />
        </HStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <div className={classNames(cls.ArticleDetails, {}, [props.className,])}>
      {content}
    </div>
  );
};

const composedArticleDetails = withLazySlices({
  reducers: { articleDetails: articleDetailsReducer, },
  onlyIfSliceReady: true,
  removeOnUnmount: true,
  loaderComponent: <ArticleDetailsSkeleton />,
})(ArticleDetails);

export { composedArticleDetails as ArticleDetails };
