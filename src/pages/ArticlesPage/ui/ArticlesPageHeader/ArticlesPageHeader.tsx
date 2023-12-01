import cls from './ArticlesPageHeader.module.scss';
import { classNames, useBoolState } from 'shared/lib';
import { memo } from 'react';
import { Button, ButtonTheme } from 'shared/ui';
import { ManageArticleFlyout } from 'widgets/ManageArticle';
import { useTranslation } from 'react-i18next';

interface ArticlesPageHeaderProps {
  className?: string
}

export const ArticlesPageHeader = memo<ArticlesPageHeaderProps>(
  function ArticlesPageHeader (props) {
    const manageArticleFlyout = useBoolState();
    const { t, } = useTranslation();

    return (
      <div
        className={classNames(cls.ArticlesPageHeader, {}, [props.className,])}
      >
        <Button
          onClick={manageArticleFlyout.enable}
          theme={ButtonTheme.OUTLINE}
        >
          {t('create')}
        </Button>
        <ManageArticleFlyout
          mode="create"
          open={manageArticleFlyout.boolState}
          onClose={manageArticleFlyout.disable}
        />
      </div>
    );
  }
);
