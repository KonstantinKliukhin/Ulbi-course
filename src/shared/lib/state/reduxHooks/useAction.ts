import { useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';

export const useAction = <
  Action extends AnyFunction,
  GetActionArg extends (...args: any[]) => Parameters<Action>[0] | undefined
>(
    action: Action,
    getActionArg?: GetActionArg
  ) => {
  const dispatch = useAppDispatch();

  return useCallback(
    (
      ...args: Parameters<
      GetActionArg extends undefined ? Action : GetActionArg
      >
    ): ReturnType<Action> => {
      if (getActionArg) {
        return dispatch(action(getActionArg(...args)));
      } else {
        return dispatch(action(...args));
      }
    },
    [dispatch, action, getActionArg,]
  );
};
