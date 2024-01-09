import {
  type CSSProperties,
  type FC, memo,
  type PropsWithChildren,
  useMemo
} from 'react';
import cls from './Drawer.module.scss';
import { classNames } from '../../../../lib/ui/classNames/classNames';
import { Portal } from '../../../Portal/Portal';
import { Overlay } from '../../../Overlay/Overlay';
import { DrawerProvider, useDrawerContext } from '../../lib/drawerContext/drawerContext';
import { type DrawerPosition } from '../../types/position';
import { useDrawerPositionStyle } from '../../lib/useDrawerPositionStyle/useDrawerPositionStyle';
import { useModal } from '../../../../lib/ui/useModal/useModal';
import { DEFAULT_Z_INDEX } from '../../constants/ui';

const mapDrawerPositionToClass: Record<DrawerPosition, string> = {
  top: 'positionTop',
  right: 'positionRight',
  bottom: 'positionBottom',
  left: 'positionLeft',
};

interface DrawerProps extends PropsWithChildren {
  className?: string;
  contentClassName?: string;
  open: boolean;
  onClose: () => void;
  lazy?: boolean;
  removeContentWhenClosed?: boolean;
  position?: DrawerPosition;
}

export const Drawer: FC<DrawerProps> = memo(function Drawer (props) {
  const {
    onClose,
    open,
    contentClassName,
    lazy,
    removeContentWhenClosed,
    position = 'right',
  } = props;
  const {
    localOpen,
    closing,
    handleClose,
    shouldRenderChildren,
  } = useModal(useMemo(() => ({
    open,
    removeContentWhenClosed,
    lazy,
    onClose,
    animationDelay: 200,
  }), [lazy, onClose, open, removeContentWhenClosed,]));
  const drawerContext = useDrawerContext();
  const contentStyle = useDrawerPositionStyle(position);

  const drawerStyle = useMemo<CSSProperties>(
    () => ({
      zIndex: (drawerContext.nestedLevel + 1) * DEFAULT_Z_INDEX,
    }),
    [drawerContext.nestedLevel,]
  );

  return (
    <DrawerProvider>
      <Portal>
        <div
          style={drawerStyle}
          className={classNames(
            cls.Drawer,
            { [cls.open]: localOpen, [cls.closing]: closing, },
            [props.className, cls[mapDrawerPositionToClass[position]],]
          )}
        >
          <Overlay onClick={handleClose} open={localOpen}/>
          <div
            style={contentStyle}
            className={classNames(cls.content, {}, [contentClassName,])}
          >
            {shouldRenderChildren ? props.children : null}
          </div>
        </div>
      </Portal>
    </DrawerProvider>
  );
});
