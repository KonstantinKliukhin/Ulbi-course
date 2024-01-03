import { memo } from 'react';
import { FormInput } from 'shared/ui';
import { useTranslation } from 'react-i18next';

interface ArticleImageBlockFormProps {
  className?: string;
}

const ArticleImageBlockForm = memo<ArticleImageBlockFormProps>(
  function ArticleImageBlockForm (props) {
    const { t, } = useTranslation('article');

    return (
      <div className={props.className}>
        <FormInput
          label={t('article_block_title_field_label')}
          name={'title'}
        />
        <FormInput label={t('article_block_image_field_label')} name={'src'} />
      </div>
    );
  }
);

export default ArticleImageBlockForm;
