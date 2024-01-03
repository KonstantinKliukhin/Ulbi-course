import { useAppSelector, useFirst } from 'shared/lib';
import { getArticlesPageSavedItemIndex } from '../../selectors/getArticlesState/getArticlesState';

export const useArticlesPageSavedItemIndex = (): number => (
  useFirst(useAppSelector(getArticlesPageSavedItemIndex))
);
