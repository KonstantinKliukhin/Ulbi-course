import { useCallback, useLayoutEffect, useRef } from 'react';

export const useEvent = <T extends (...args: any[]) => any>(fn: T): T => {
  const fnRef = useRef<T>(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  });

  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    return fnRef.current.apply(null, args);
  }, [fnRef,]) as T;
};
