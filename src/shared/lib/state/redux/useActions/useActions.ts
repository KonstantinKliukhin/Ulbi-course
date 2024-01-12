import { useMemo } from 'react';
import { useAppDispatch } from '../useAppDispatch/useAppDispatch';
import { bindActionCreators } from '@reduxjs/toolkit';

export function useActions<T> (
  actions: T
): T {
  const dispatch = useAppDispatch();

  // @ts-expect-error rtk error
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch, actions,]);
}
