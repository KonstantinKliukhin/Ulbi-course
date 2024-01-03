import React, { memo, type ReactElement, type ReactNode, useMemo } from 'react';
import {
  type CollisionDetection,
  DndContext,
  type DragCancelEvent,
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  type Modifiers,
  PointerSensor,
  type PointerSensorOptions,
  TouchSensor,
  type TouchSensorOptions,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import cls from './CustomDndContext.module.scss';

interface DraggableContextProps {
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragMove?: (event: DragMoveEvent) => void;
  onDragCancel?: (event: DragCancelEvent) => void;
  children: ReactNode | ReactElement;
  overlayChildren?: ReactNode | ReactElement;
  pointerSensorOptions?: PointerSensorOptions;
  touchSensorOptions?: TouchSensorOptions;
  collisionDetection?: CollisionDetection;
  overlayModifiers?: Modifiers;
}

const defaultPointerSensorOptions: PointerSensorOptions = {
  // hack for buttons to still be clickable
  activationConstraint: { distance: 8, },
};
const defaultTouchSensorOptions: TouchSensorOptions = {
  // hack for buttons to still be clickable
  activationConstraint: { distance: 8, },
};

export const CustomDndContext = memo<DraggableContextProps>(
  function CustomDndContext (props) {
    const sensors = useSensors(
      useSensor(
        PointerSensor,
        useMemo(
          () => ({
            ...defaultPointerSensorOptions,
            ...props.pointerSensorOptions,
          }),
          [props.pointerSensorOptions,]
        )
      ),
      useSensor(
        TouchSensor,
        useMemo(
          () => ({
            ...defaultTouchSensorOptions,
            ...props.touchSensorOptions,
          }),
          [props.touchSensorOptions,]
        )
      )
    );

    return (
      <DndContext
        onDragOver={props.onDragOver}
        collisionDetection={props.collisionDetection}
        sensors={sensors}
        onDragStart={props.onDragStart}
        onDragEnd={props.onDragEnd}
        onDragMove={props.onDragMove}
        onDragCancel={props.onDragCancel}
      >
        {props.children}
        {props.overlayChildren
          ? (
            <DragOverlay
              modifiers={props.overlayModifiers}
              zIndex={1000}
              className={cls.overlay}
            >
              {props.overlayChildren}
            </DragOverlay>
            )
          : null}
      </DndContext>
    );
  }
);
