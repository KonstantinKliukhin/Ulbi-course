import { memo, type PropsWithChildren, useCallback, useMemo, useRef } from 'react';
import type { DragEndEvent, DragMoveEvent } from '@dnd-kit/core';
import { DropRegion } from '../../constants/dropRegions';
import { createRubberbandModifier } from '../../../../lib/dnd/modifiers/createRubberbandModifier/createRubberbandModifier';
import { MAX_DRAWER_HEIGHT_PERCENT } from '../../constants/ui';
import {
  type AsyncLibrariesNames,
  withLibraries,
  type WithLibrariesProps
} from '../../../../lib/providers/withLibraries/withLibraries';

const usedLibraries: AsyncLibrariesNames[] = ['dndKitCore', 'dndKitModifiers',];

interface MobileDrawerDndContextProps extends WithLibrariesProps<typeof usedLibraries>, PropsWithChildren {
  onClose: () => void;
}

interface DragTrackedData {
  distance: number;
  timestamp: number;
  velocity: number;
}
const rubberbandModifier = createRubberbandModifier(MAX_DRAWER_HEIGHT_PERCENT);

const TRIGGER_DELAY = 25;
const TRIGGER_TOLERANCE = 40;
const INITIAL_DRAG_TRACKED_DATA: DragTrackedData = {
  distance: 0,
  timestamp: 0,
  velocity: 0,
};

const MobileDrawerDndContext = memo<MobileDrawerDndContextProps>(
  function MobileDrawerDndContext (props) {
    const { dndKitModifiers, dndKitCore, } = props;
    console.log('props: ', props);
    const modifiers = useMemo(() => [dndKitModifiers.restrictToVerticalAxis, rubberbandModifier,],
      [dndKitModifiers.restrictToVerticalAxis,]);
    const { onClose, } = props;
    const tracked = useRef<DragTrackedData>(INITIAL_DRAG_TRACKED_DATA);

    const sensors = dndKitCore.useSensors(
      dndKitCore.useSensor(dndKitCore.PointerSensor, {
        activationConstraint: {
          delay: TRIGGER_DELAY,
          tolerance: TRIGGER_TOLERANCE,
        },
      }),
      dndKitCore.useSensor(dndKitCore.TouchSensor, {
        activationConstraint: {
          delay: TRIGGER_DELAY,
          tolerance: TRIGGER_TOLERANCE,
        },
      })
    );

    const onDragMove = useCallback((event: DragMoveEvent) => {
      // Track mobile velocity
      const timestamp = Date.now();
      const timeDelta = timestamp - tracked.current.timestamp;
      const distance = tracked.current.distance - event.delta.y;
      const velocity = Math.round((distance / timeDelta) * 1000);

      tracked.current = {
        distance: event.delta.y,
        velocity,
        timestamp,
      };
    }, []);

    const onDragEnd = useCallback((event: DragEndEvent) => {
      const isVelocityHigh = Math.abs(tracked.current.velocity) > 500;
      const isPositiveVelocityDirection = tracked.current.velocity > 0;
      const isOverExist = Boolean(event.over);
      const isExpanded = event.over?.id === DropRegion.EXPAND;

      if ((isVelocityHigh && !isPositiveVelocityDirection) || (isOverExist && !isExpanded)) {
        onClose();
      }

      tracked.current = INITIAL_DRAG_TRACKED_DATA;
    }, [onClose,]);

    return (
      <dndKitCore.DndContext
        autoScroll={false}
        modifiers={modifiers}
        sensors={sensors}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      >
        {props.children}
      </dndKitCore.DndContext>
    );
  });

const WithLibrariesMobileDrawerDndContext = withLibraries({
  libraries: usedLibraries,
})(MobileDrawerDndContext);

export { WithLibrariesMobileDrawerDndContext as MobileDrawerDndContext };
