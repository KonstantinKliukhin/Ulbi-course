import { useMemo } from 'react';
import { useAppDispatch } from 'shared/lib';

export function useActions<T extends Record<string, (...args: any[]) => any>> (actions: T): T {
  const dispatch = useAppDispatch();

  return useMemo((): T => {
    const actionsEntries = Object.entries(actions) as Array<[keyof T, T[keyof T]]>;

    return actionsEntries.reduce<T>((acc, [key, action,]) => ({
      ...acc,
      [key]: (...args: any[]) => dispatch(action(...args)),
    }), actions);
  }, [dispatch, actions,]);
}
