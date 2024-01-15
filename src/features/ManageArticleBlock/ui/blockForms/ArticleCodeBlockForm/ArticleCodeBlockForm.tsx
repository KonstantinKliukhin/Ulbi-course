import { memo } from 'react';
import { FormInput, FormTextArea } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

const ArticleCodeBlockForm = memo(
  function ArticleCodeBlockForm () {
    const { t, } = useTranslation('article');

    return (
      <>
        <FormInput
          label={t('article_block_title_field_label')}
          name={'title'}
        />
        <FormTextArea
          resize="vertical"
          label={t('article_block_code_field_label')}
          name={'code'}
        />
      </>
    );
  }
);

export default ArticleCodeBlockForm;
