import React, { memo, type ReactElement, type ReactNode, useMemo } from 'react';
import type {
  CollisionDetection,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  Modifiers,
  PointerSensorOptions,
  TouchSensorOptions
} from '@dnd-kit/core';
import cls from './CustomDndContext.module.scss';
import {
  type AsyncLibrariesNames, withLibraries,
  type WithLibrariesProps
} from '../../../lib/optimization/withLibraries/withLibraries';

const usedLibraries: AsyncLibrariesNames[] = ['dndKitCore',];

interface DraggableContextProps extends WithLibrariesProps<typeof usedLibraries> {
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

const CustomDndContext = memo<DraggableContextProps>(
  function CustomDndContext (props) {
    const { dndKitCore, } = props;
    const sensors = dndKitCore.useSensors(
      dndKitCore.useSensor(
        dndKitCore.PointerSensor,
        useMemo(
          () => ({
            ...defaultPointerSensorOptions,
            ...props.pointerSensorOptions,
          }),
          [props.pointerSensorOptions,]
        )
      ),
      dndKitCore.useSensor(
        dndKitCore.TouchSensor,
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
      <dndKitCore.DndContext
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
            <dndKitCore.DragOverlay
              modifiers={props.overlayModifiers}
              zIndex={1000}
              className={cls.overlay}
            >
              {props.overlayChildren}
            </dndKitCore.DragOverlay>
            )
          : null}
      </dndKitCore.DndContext>
    );
  }
);

const WithDndKitCustomDndContext = withLibraries({
  libraries: usedLibraries,
})(CustomDndContext);

export { WithDndKitCustomDndContext as CustomDndContext };
