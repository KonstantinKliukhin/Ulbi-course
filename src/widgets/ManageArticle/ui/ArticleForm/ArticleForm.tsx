import { memo, type ReactNode } from 'react';
import { Button, FormHeader, FormInput, VStack } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { FormArticleTypesTabs } from '@/features/SelectArticleType';

interface ArticleFormProps {
  className?: string;
  title: string;
  blocksChildren: ReactNode;
  onCancel: () => void;
  isSubmitDisabled: boolean;
}

const ArticleForm = memo<ArticleFormProps>(function ArticleForm (props) {
  const { t: tGlobal, } = useTranslation();
  const { t, } = useTranslation('article');

  return (
    <VStack align="stretch" yGap={32} className={props.className}>
      <FormHeader
        title={props.title}
        actions={
          <>
            <Button
              type="submit"
              theme="backgroundInverted"
              disabled={props.isSubmitDisabled}
            >
              {tGlobal('save')}
            </Button>
            <Button theme="outlineRed" onClick={props.onCancel}>
              {tGlobal('cancel')}
            </Button>
          </>
        }
      />
      <FormInput
        label={t('article_title_label')}
        name="title"
      />
      <FormInput
        label={t('article_subtitle_label')}
        name="subtitle"
      />
      <FormInput
        label={t('article_img_label')}
        name="img"
      />
      <FormArticleTypesTabs
        label={t('article_type_label')}
        name="type"
        multiple
        excludeAll
      />
      {props.blocksChildren}
    </VStack>
  );
});

export default ArticleForm;
