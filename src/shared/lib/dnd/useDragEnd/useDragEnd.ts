import { findIndexById } from '../../utils/findIndexById/findIndexById';
import type { DragEndEvent } from '@dnd-kit/core';
import { useCallback } from 'react';
import { type AsyncLibrariesNames, useLibraries } from '../../optimization/withLibraries/withLibraries';
import { useEvent } from '../../optimization/useEvent/useEvent';

export interface UseDragEndCallbackArgs<T extends { id: string | number }> {
  movedArray: T[];
  oldIndex: number;
  newIndex: number;
  direction: 1 | -1;
}

const usedLibraries: AsyncLibrariesNames[] = ['dndKitSortable',];

export const useDragEnd = <
  T extends {
    id: string | number;
  }
>(
    arr: T[],
    callback: (arg: UseDragEndCallbackArgs<T>) => void
  ) => {
  const dndKitData = useLibraries(usedLibraries);
  const callbackEvent = useEvent(callback);

  return useCallback(
    (e: DragEndEvent) => {
      if (e.over?.id && e.active.id !== e.over?.id && dndKitData.dndKitSortable) {
        const oldIndex = findIndexById(arr, e.active.id);
        const newIndex = findIndexById(arr, e.over.id);
        if (newIndex === oldIndex) return;

        const direction = newIndex > oldIndex ? 1 : -1;
        const movedArray = dndKitData?.dndKitSortable?.arrayMove(arr, oldIndex, newIndex);

        callbackEvent({ movedArray, direction, newIndex, oldIndex, });
      }
    },
    [arr, dndKitData?.dndKitSortable, callbackEvent,]
  );
};
