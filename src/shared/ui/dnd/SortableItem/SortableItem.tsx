import React, { memo, type PropsWithChildren, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type Data } from '@dnd-kit/core/dist/store';
import cls from './SortableItem.module.scss';
import { classNames } from '../../../lib/classNames/classNames';

type SortableItemProps = PropsWithChildren & {
  draggingClass?: string;
  defaultClass?: string;
  id: string | number;
  data?: Data;
  disabled?: boolean;
};
export const SortableItem = memo<SortableItemProps>(function SortableItem (
  props
) {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
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
      transform: CSS.Transform.toString(transform),
      transition: transition || undefined,
    };
  }, [transform, transition,]);

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
