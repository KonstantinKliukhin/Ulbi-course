import { memo } from 'react';
import { FormInput } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

const ArticleImageBlockForm = memo(
  function ArticleImageBlockForm () {
    const { t, } = useTranslation('article');

    return (
      <>
        <FormInput
          label={t('article_block_title_field_label')}
          name={'title'}
        />
        <FormInput label={t('article_block_image_field_label')} name={'src'} />
      </>
    );
  }
);

export default ArticleImageBlockForm;
