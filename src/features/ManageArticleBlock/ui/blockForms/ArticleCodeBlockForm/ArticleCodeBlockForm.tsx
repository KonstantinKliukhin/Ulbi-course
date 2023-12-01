import { memo } from 'react';
import { FormTextArea } from 'shared/ui';
import { useTranslation } from 'react-i18next';

interface ArticleCodeBlockFormProps {
  className?: string
}

const ArticleCodeBlockForm = memo<ArticleCodeBlockFormProps>(
  function ArticleCodeBlockForm (props) {
    const { t, } = useTranslation('article');

    return (
      <div className={props.className}>
        <FormTextArea
          label={t('article_block_code_field_label')}
          name={'code'}
        />
      </div>
    );
  }
);

export default ArticleCodeBlockForm;
