import { type MutableRefObject, useCallback } from 'react';

type RefItem<T> =
  | ((element: T | null) => void)
  | MutableRefObject<T | null> | null
  | undefined;

export const useCombinedRefs = <T>(...refs: Array<RefItem<T>>) => useCallback(
  (element: T | null) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        ref(element);
      } else {
        ref.current = element;
      }
    });
    // eslint-disable-next-line
  }, refs);
