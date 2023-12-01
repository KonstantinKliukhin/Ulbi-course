import { useYupValidationResolver } from 'shared/lib';
import { validateArticle } from '../../validation/validateArticle/validateArticle';
import { useForm } from 'react-hook-form';
import { type Article } from 'entities/Article';
import { useEffect } from 'react';
import { type ArticleFormType } from '../../types/articleForm';

const defaultArticleState: DeepPartial<ArticleFormType> = {
  type: [],
  blocks: [],
};

export const useArticleForm = (initialState?: Article) => {
  const resolver = useYupValidationResolver<ArticleFormType>(validateArticle);

  const articleForm = useForm<ArticleFormType>({
    defaultValues: initialState || defaultArticleState,
    mode: 'onChange',
    delayError: 150,
    resolver,
  });
  const { reset, } = articleForm;

  useEffect(() => {
    if (initialState) {
      reset(initialState);
    } else {
      reset(defaultArticleState);
    }
  }, [reset, initialState,]);

  return articleForm;
};
