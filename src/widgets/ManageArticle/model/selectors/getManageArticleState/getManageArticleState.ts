import { type FormMode } from '@/shared/types';
import { type ArticleBlock } from '@/entities/Article';
import { buildSelector } from '@/shared/lib';

export const [useBlockFormMode, getBlockFormMode,] = buildSelector(
  (state): FormMode => state.manageArticle?.blockFormMode ?? 'none'
);
export const [useCurrentBlockIndex, getCurrentBlockIndex,] = buildSelector(
  (state): number => state.manageArticle?.currentBlockIndex ?? -1
);
export const [useEditingArticleBlock, getEditingArticleBlock,] = buildSelector(
  (state): ArticleBlock | null => state.manageArticle?.editingArticleBlock ?? null
);
