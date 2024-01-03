import { memo } from 'react';
import { Button, FormCustomListBox, FormHeader } from 'shared/ui';
import { ArticleBlockFormPicker } from '../blockForms/ArticleBlockFormPicker/ArticleBlockFormPicker';
import { useTranslation } from 'react-i18next';
import {
  type ArticleBlock,
  type ArticleBlockType,
  useArticleBlockTypesSelectOptions
} from 'entities/Article';
import { type Control } from 'react-hook-form';
import { type ArticleBlockFormType } from '../../model/types/articleBlockForm';

interface ArticleBlockFormProps {
  isSubmitDisabled: boolean;
  title: string;
  articleBlock?: ArticleBlock;
  onCancel: () => void;
  blockType: ArticleBlockType;
  control: Control<ArticleBlockFormType>;
}

export const ArticleBlockForm = memo<ArticleBlockFormProps>(
  function ArticleBlockForm (props) {
    const { t, } = useTranslation('article');
    const { t: tGlobal, } = useTranslation();
    const articleTypesOptions = useArticleBlockTypesSelectOptions();

    return (
      <>
        <FormHeader
          title={props.title}
          actions={
            <>
              <Button
                type="submit"
                theme="outline"
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

        <FormCustomListBox
          label={t('article_block_type_field_label')}
          name={'type'}
          options={articleTypesOptions}
        />

        <ArticleBlockFormPicker
          blockType={props.blockType}
          control={props.control}
        />
      </>
    );
  }
);
