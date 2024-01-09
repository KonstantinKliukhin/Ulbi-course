import { type CSSProperties, memo, type ReactNode, useMemo } from 'react';
import { classNames } from '../../../../lib/classNames/classNames';

import { MobileDrawerHeader } from '../MobileDrawerHeader/MobileDrawerHeader';

import cls from './MobileDrawerSheet.module.scss';
import { MAX_DRAWER_HEIGHT_PERCENT } from '../../constants/ui';
import {
  type AsyncLibrariesNames,
  withLibraries,
  type WithLibrariesProps
} from '../../../../lib/providers/withLibraries/withLibraries';

interface SheetProps extends WithLibrariesProps<typeof usedLibraries> {
  children: ReactNode;
  open?: boolean;
  header: ReactNode;
}

const usedLibraries: AsyncLibrariesNames[] = ['dndKitCore',];

const HEADER_DRAGGABLE_ID = 'header';

const MobileDrawerSheet = memo<SheetProps>(function MobileDrawerSheet (props) {
  const { dndKitCore, } = props;
  const {
    attributes,
    isDragging,
    listeners,
    transform,
    setNodeRef,
  } = dndKitCore.useDraggable({ id: HEADER_DRAGGABLE_ID, });

  const styleVariables = useMemo(() => ({
    '--max-height': `${MAX_DRAWER_HEIGHT_PERCENT * 100}vh`,
    '--transform': transform?.y ? `${transform.y}px` : undefined,
  } as unknown as CSSProperties), [transform?.y,]);

  return (
    <div
      className={classNames(cls.MobileDrawerSheet, {
        [cls.dragging]: isDragging,
        [cls.open]: props.open,
      })}
      style={styleVariables}
    >
      <MobileDrawerHeader ref={setNodeRef} {...attributes} {...listeners}>
        {props.header}
      </MobileDrawerHeader>
      {props.children}
    </div>
  );
});

const WithLibrariesMobileDrawerSheet = withLibraries({
  libraries: usedLibraries,
})(MobileDrawerSheet);

export { WithLibrariesMobileDrawerSheet as MobileDrawerSheet };
