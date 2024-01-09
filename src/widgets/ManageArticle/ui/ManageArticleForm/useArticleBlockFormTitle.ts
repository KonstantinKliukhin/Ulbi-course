import { type FormMode } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const ARTICLE_BLOCK_FORM_TITLE_MAP: Partial<Record<FormMode, string>> = {
  edit: 'article_block_form_title_edit',
  copy: 'article_block_form_title_copy',
  create: 'article_block_form_title_create',
};

export const useArticleBlockFormTitle = (formMode: FormMode) => {
  const { t, } = useTranslation('article');

  return useMemo(
    () => t(ARTICLE_BLOCK_FORM_TITLE_MAP[formMode] ?? ''),
    [formMode, t,]
  );
};
