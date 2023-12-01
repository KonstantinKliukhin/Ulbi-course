import { type FormMode } from 'shared/types';
import { type ArticleBlock } from 'entities/Article';

export interface ManageArticleSchema {
  blockFormMode: FormMode
  currentBlockIndex: number
  editingArticleBlock: ArticleBlock | null
  isLoading: boolean
  error: null | string
}
