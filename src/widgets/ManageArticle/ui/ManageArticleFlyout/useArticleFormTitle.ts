import { type FormMode } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const ARTICLE_FORM_TITLE_MAP: Partial<Record<FormMode, string>> = {
  edit: 'edit_article_title',
  create: 'create_article_title',
};

export const useArticleFormTitle = (formMode: FormMode) => {
  const { t, } = useTranslation('article');

  return useMemo(
    () => t(ARTICLE_FORM_TITLE_MAP[formMode] ?? ''),
    [formMode, t,]
  );
};
