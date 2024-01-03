import { findIndexById } from '../../../findIndexById/findIndexById';
import { type DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback } from 'react';

export interface UseDragEndCallbackArgs<T extends { id: string | number }> {
  movedArray: T[];
  oldIndex: number;
  newIndex: number;
  direction: 1 | -1;
}

export const useDragEnd = <
  T extends {
    id: string | number;
  }
>(
    arr: T[],
    callback: (arg: UseDragEndCallbackArgs<T>) => void
  ) => {
  return useCallback(
    (e: DragEndEvent) => {
      if (e.over?.id && e.active.id !== e.over?.id) {
        const oldIndex = findIndexById(arr, e.active.id);
        const newIndex = findIndexById(arr, e.over.id);
        if (newIndex === oldIndex) return;

        const direction = newIndex > oldIndex ? 1 : -1;
        const movedArray = arrayMove(arr, oldIndex, newIndex);

        callback({ movedArray, direction, newIndex, oldIndex, });
      }
    },
    [callback, arr,]
  );
};
