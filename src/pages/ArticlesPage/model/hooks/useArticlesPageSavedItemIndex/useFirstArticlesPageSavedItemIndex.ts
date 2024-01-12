import { useFirst } from '@/shared/lib';
import {
  useArticlesPageSavedItemIndex
} from '../../selectors/getArticlesState/getArticlesState';

export const useFirstArticlesPageSavedItemIndex = (): number => (
  useFirst(useArticlesPageSavedItemIndex())
);
