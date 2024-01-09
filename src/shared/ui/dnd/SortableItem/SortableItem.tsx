import React, { memo, type PropsWithChildren, useMemo } from 'react';
import type { Data } from '@dnd-kit/core/dist/store';
import cls from './SortableItem.module.scss';
import { classNames } from '../../../lib/ui/classNames/classNames';
import {
  type AsyncLibrariesNames,
  withLibraries,
  type WithLibrariesProps
} from '../../../lib/optimization/withLibraries/withLibraries';

const usedLibraries: AsyncLibrariesNames[] = ['dndKitSortable', 'dndKitUtils',];

interface SortableItemProps extends PropsWithChildren, WithLibrariesProps<typeof usedLibraries> {
  draggingClass?: string;
  defaultClass?: string;
  id: string | number;
  data?: Data;
  disabled?: boolean;
}

const SortableItem = memo<SortableItemProps>(function SortableItem (
  props
) {
  const { dndKitUtils, dndKitSortable, } = props;

  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
  } = dndKitSortable.useSortable({
    id: props.id,
    data: props.data,
    disabled: props.disabled,
  });

  const style = useMemo(() => {
    if (transform?.scaleX) {
      transform.scaleX = 1;
    }

    if (transform?.scaleY) {
      transform.scaleY = 1;
    }

    return {
      transform: dndKitUtils.CSS.Transform.toString(transform),
      transition: transition || undefined,
    };
  }, [dndKitUtils.CSS.Transform, transform, transition,]);

  return (
    <div
      className={classNames(cls.root, {
        [props.draggingClass || '']: isDragging,
      }, [props.defaultClass,])}
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
});

const WithLibrariesSortableItem = withLibraries({
  libraries: usedLibraries,
})(SortableItem);

export { WithLibrariesSortableItem as SortableItem };
