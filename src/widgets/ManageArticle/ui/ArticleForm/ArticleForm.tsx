import { memo, type ReactNode } from 'react';
import cls from './ArticleForm.module.scss';
import { classNames } from 'shared/lib';
import { Button, ButtonTheme, FormHeader, FormInput } from 'shared/ui';
import { FormArticleTypesTabs } from 'entities/Article';
import { useTranslation } from 'react-i18next';

interface ArticleFormProps {
  className?: string
  title: string
  blocksChildren: ReactNode
  onCancel: () => void
  isSubmitDisabled: boolean
}

const ArticleForm = memo<ArticleFormProps>(function ArticleForm (props) {
  const { t: tGlobal, } = useTranslation();
  const { t, } = useTranslation('article');

  return (
    <div className={classNames(cls.ArticleForm, {}, [props.className,])}>
      <FormHeader
        title={props.title}
        actions={
          <>
            <Button
              type="submit"
              theme={ButtonTheme.BACKGROUND_INVERTED}
              disabled={props.isSubmitDisabled}
            >
              {tGlobal('save')}
            </Button>
            <Button theme={ButtonTheme.OUTLINE_RED} onClick={props.onCancel}>
              {tGlobal('cancel')}
            </Button>
          </>
        }
      />
      <FormInput
        label={t('article_title_label')}
        className={cls.input}
        name="title"
      />
      <FormInput
        label={t('article_subtitle_label')}
        className={cls.input}
        name="subtitle"
      />
      <FormInput
        label={t('article_img_label')}
        className={cls.input}
        name="img"
      />
      <FormArticleTypesTabs
        label={t('article_type_label')}
        name="type"
        multiple
        excludeAll
      />
      {props.blocksChildren}
    </div>
  );
});

export default ArticleForm;
