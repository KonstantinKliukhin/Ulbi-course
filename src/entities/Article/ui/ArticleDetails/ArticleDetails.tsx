import { type FC, type ReactNode, useCallback, useEffect } from 'react';
import cls from './ArticleDetails.module.scss';
import { classNames, useAppDispatch, useAppSelector, withLazySlices } from 'shared/lib';
import { fetcharticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/getArticleDetails/getArticleDetails';
import { Avatar, Icon, Text, TextAlign, TextTheme } from 'shared/ui';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleDetailsSkeleton } from 'entities/Article/ui/ArticleDetailsSkeleton/ArticleDetailsSkeleton';
import EyeIcon from '../../../../../public/assets/icons/eye-20-20.svg';
import CalendarIcon from '../../../../../public/assets/icons/calendar-20-20.svg';
import { TextSize } from 'shared/ui/Text/Text';
import { type ArticleBlock, ArticleBlockType } from 'entities/Article';
import { ArticleCodeBlockComponent } from 'entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from 'entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
  className?: string
  id: string
}

const ArticleDetails: FC<ArticleDetailsProps> = props => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getArticleDetailsIsLoading);
  const error = useAppSelector(getArticleDetailsError);
  const article = useAppSelector(getArticleDetailsData);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      void dispatch(fetcharticleById(props.id));
    }
  }, [props.id, dispatch,]);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent className={cls.block} block={block} key={block.id}/>;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent className={cls.block} block={block} key={block.id}/>;
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent className={cls.block} block={block} key={block.id}/>;
    }
  }, []);

  let content: ReactNode;

  if (isLoading) {
    content = <ArticleDetailsSkeleton/>;
  } else if (error) {
    content = <Text theme={TextTheme.ERROR} align={TextAlign.CENTER} title={error}/>;
  } else {
    content = (
      <>
        <Avatar size={200} src={article?.img} className={cls.avatar}/>
        <Text size={TextSize.L} title={article?.title} text={article?.subtitle}/>
        <div className={cls.metaLine}>
          <Icon Svg={EyeIcon}/>
          <Text text={String(article?.views)}/>
        </div>
        <div className={cls.metaLine}>
          <Icon Svg={CalendarIcon}/>
          <Text text={article?.createdAt}/>
        </div>
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

const composedArticleDetails = withLazySlices(
  ArticleDetails,
  {
    reducers: { articleDetails: articleDetailsReducer, },
    onlyIfSliceReady: true,
    removeOnUnmount: true,
    loaderComponent: <ArticleDetailsSkeleton/>,
  }
);

export { composedArticleDetails as ArticleDetails };
