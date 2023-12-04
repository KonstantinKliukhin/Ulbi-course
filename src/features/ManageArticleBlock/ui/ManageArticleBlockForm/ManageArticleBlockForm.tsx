import { memo, useCallback } from 'react';
import { FormProvider } from 'react-hook-form';
import { type ArticleBlock } from 'entities/Article';
import { useArticleBlockForm } from '../../model/hooks/useArticleBlockForm/useArticleBlockForm';
import { formToArticleBlock } from '../../lib/formToArticleBlock/formToArticleBlock';
import { ArticleBlockForm } from '../ArticleBlockForm/ArticleBlockForm';

interface ManageArticleBlockFormProps {
  articleBlock?: ArticleBlock
  title: string
  onSubmit: (articleBlock: ArticleBlock) => void
  onCancel: () => void
}

const ManageArticleBlockForm = memo<ManageArticleBlockFormProps>(
  function ManageArticleBlockForm (props) {
    const { onSubmit, onCancel, } = props;
    const articleBlockForm = useArticleBlockForm(props.articleBlock);
    const { reset: resetArticleBlockForm, } = articleBlockForm;
    const blockType = articleBlockForm.watch('type');
    const isSubmitDisabled =
      !articleBlockForm.formState.isValid ||
      !articleBlockForm.formState.isDirty;
    const onArticleBlockFormSubmit = useCallback(
      (form: ArticleBlock) => {
        const articleBlock = formToArticleBlock(form);
        onSubmit(articleBlock);
        resetArticleBlockForm({});
      },
      [onSubmit, resetArticleBlockForm,]
    );

    const onArticleBlockFormCancel = useCallback(() => {
      onCancel();
      resetArticleBlockForm({});
    }, [onCancel, resetArticleBlockForm,]);

    return (
      <FormProvider {...articleBlockForm}>
        <form
          onSubmit={articleBlockForm.handleSubmit(onArticleBlockFormSubmit)}
        >
          <ArticleBlockForm
            isSubmitDisabled={isSubmitDisabled}
            title={props.title}
            onCancel={onArticleBlockFormCancel}
            blockType={blockType}
            control={articleBlockForm.control}
          />
        </form>
      </FormProvider>
    );
  }
);

export default ManageArticleBlockForm;
