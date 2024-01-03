import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'shared/lib';
import { validateComment } from 'entities/Comment';
import { type AddArticleCommentForm } from '../../types/addArticleCommentForm';

export const useAddArticleCommentForm = () => {
  const resolver = useYupValidationResolver(validateComment);

  return useForm<AddArticleCommentForm>({
    resolver,
    mode: 'onChange',
    delayError: 150,
  });
};
