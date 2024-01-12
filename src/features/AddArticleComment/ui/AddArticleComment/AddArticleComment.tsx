import { memo, useCallback } from 'react';
import { AddCommentForm } from '@/entities/Comment';
import { type RtkError } from '@/shared/types';
import { FormProvider } from 'react-hook-form';
import { useAddArticleCommentForm } from '../../model/hooks/useAddArticleCommentForm/useAddArticleCommentForm';
import { type AddArticleCommentForm } from '../../model/types/addArticleCommentForm';
import { useUserAuthData } from '@/entities/User';
import { useAddArticleCommentMutation } from '@/entities/Article';

interface AddArticleCommentProps {
  className?: string;
  articleId?: string;
}

const AddArticleComment = memo<AddArticleCommentProps>(function AddArticleComment (props) {
  const addArticleCommentForm = useAddArticleCommentForm();
  const { reset: resetArticleCommentForm, } = addArticleCommentForm;
  const user = useUserAuthData();
  const [addArticleComment, addArticleCommentData,] = useAddArticleCommentMutation();

  const onSubmit = useCallback((formValue: AddArticleCommentForm) => {
    if (user?.id && props.articleId) {
      void addArticleComment({
        articleId: props.articleId,
        commentText: formValue.text,
        userId: user?.id,
      }).then((comment) => {
        if ('data' in comment) {
          resetArticleCommentForm();
        }
      });
    }
  }, [addArticleComment, resetArticleCommentForm, props.articleId, user?.id,]);

  return (
    <FormProvider {...addArticleCommentForm}>
      <form onSubmit={addArticleCommentForm.handleSubmit(onSubmit)}>
        <AddCommentForm
          className={props.className}
          isLoading={addArticleCommentData.isLoading}
          isValid={addArticleCommentForm.formState.isValid}
          error={(addArticleCommentData.error as RtkError)?.message}
        />
      </form>
    </FormProvider>
  );
});

export default AddArticleComment;
