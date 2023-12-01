import { memo, type ReactNode, useMemo } from 'react';
import cls from './ArticleDetailsPageHeader.module.scss';
import { classNames, useAppSelector, useBoolState } from 'shared/lib';
import { Link } from 'react-router-dom';
import { RoutePath } from 'shared/config';
import { Button, ButtonTheme } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { getCanEditArticle } from '../../model/selectors/getCanEditArticle/getCanEditArticle';
import { getArticleDetailsData } from 'entities/Article';
import { ManageArticleFlyout } from 'widgets/ManageArticle';

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo<ArticleDetailsPageHeaderProps>(
  function ArticleDetailsPageHeader (props) {
    const { t: articleT, } = useTranslation('article');
    const { t, } = useTranslation();
    const canEditArticle = useAppSelector(getCanEditArticle);
    const article = useAppSelector(getArticleDetailsData);
    const {
      enable: openArticleFlyout,
      disable: closeArticleFlyout,
      boolState: articleFlyoutOpen,
    } = useBoolState();

    const rightContent = useMemo<ReactNode>(() => {
      if (canEditArticle) {
        return (
          <Button theme={ButtonTheme.OUTLINE} onClick={openArticleFlyout}>
            {t('edit')}
          </Button>
        );
      } else {
        return null;
      }
    }, [canEditArticle, t, openArticleFlyout,]);

    return (
      <div
        className={classNames(cls.ArticleDetailsPageHeader, {}, [
          props.className,
        ])}
      >
        <Link to={RoutePath.articles}>
          <Button theme={ButtonTheme.OUTLINE}>
            {articleT('back_to_list')}
          </Button>
        </Link>

        <div className={cls.right}>{rightContent}</div>

        {article
          ? (
            <ManageArticleFlyout
              mode="edit"
              onClose={closeArticleFlyout}
              open={articleFlyoutOpen}
              article={article}
            />
            )
          : null}
      </div>
    );
  }
);