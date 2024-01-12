import { useAppSelector } from '../useAppSelector/useAppSelector';

type Selector<T> = (state: StateSchema) => T;
type BuildSelectorReturn<T> = [() => T, Selector<T>];

export const buildSelector = <T>(selector: Selector<T>): BuildSelectorReturn<T> => {
  const useSelectorHook = () => useAppSelector(selector);

  return [useSelectorHook, selector,];
};
