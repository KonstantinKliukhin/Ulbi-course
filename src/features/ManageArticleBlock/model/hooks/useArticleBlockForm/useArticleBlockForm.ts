import { type ArticleBlock, ArticleBlockType } from 'entities/Article';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useYupValidationResolver } from 'shared/lib';
import { validateArticleBlock } from '../../validation/validateArticleBlock/validateArticleBlock';
import { type ArticleBlockFormType } from '../../types/articleBlockForm';
import { v4 as uuidV4 } from 'uuid';

const defaultState: DeepPartial<ArticleBlock> = {
  type: ArticleBlockType.TEXT,
  paragraphs: [{ id: uuidV4(), text: '', },],
};

export const useArticleBlockForm = (
  initialState?: ArticleBlock,
  existingArticleBlocks: ArticleBlock[] = []
) => {
  const resolver = useYupValidationResolver<ArticleBlockFormType>(
    validateArticleBlock(existingArticleBlocks)
  );
  const blockForm = useForm<ArticleBlockFormType>({
    mode: 'onChange',
    delayError: 150,
    defaultValues: initialState ?? defaultState,
    resolver,
  });
  const { reset, } = blockForm;

  useEffect(() => {
    reset(initialState ?? defaultState);
  }, [initialState, reset,]);

  return blockForm;
};
