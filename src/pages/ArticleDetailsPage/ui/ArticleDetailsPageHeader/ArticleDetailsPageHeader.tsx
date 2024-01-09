import { memo, type ReactNode, useMemo } from 'react';
import cls from './ArticleDetailsPageHeader.module.scss';
import { classNames, useBoolState } from '@/shared/lib';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/shared/config';
import { Button, HStack } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { type Article } from '@/entities/Article';
import { ManageArticleFlyout } from '@/widgets/ManageArticle';
import { useGetCanEditArticle } from '../../model/hooks/useCanEditArticle/useCanEditArticle';

interface ArticleDetailsPageHeaderProps {
  className?: string;
  article?: Article;
}

export const ArticleDetailsPageHeader = memo<ArticleDetailsPageHeaderProps>(
  function ArticleDetailsPageHeader (props) {
    const { t: articleT, } = useTranslation('article');
    const { t, } = useTranslation();
    const canEditArticle = useGetCanEditArticle(props.article);
    const {
      enable: openArticleFlyout,
      disable: closeArticleFlyout,
      boolState: articleFlyoutOpen,
    } = useBoolState();

    const rightContent = useMemo<ReactNode>(() => {
      if (canEditArticle) {
        return (
          <Button theme="outline" onClick={openArticleFlyout}>
            {t('edit')}
          </Button>
        );
      } else {
        return null;
      }
    }, [canEditArticle, t, openArticleFlyout,]);

    return (
      <HStack
        justify="between"
        align="center"
        className={classNames(cls.ArticleDetailsPageHeader, {}, [
          props.className,
        ])}
      >
        <Link to={RoutePath.articles}>
          <Button theme="outline">{articleT('back_to_list')}</Button>
        </Link>

        <HStack align="center" xGap={16} className={cls.right}>
          {rightContent}
        </HStack>

        {props.article
          ? (
            <ManageArticleFlyout
              mode="edit"
              onClose={closeArticleFlyout}
              open={articleFlyoutOpen}
              article={props.article}
            />
            )
          : null}
      </HStack>
    );
  }
);
