import {
  type CSSProperties,
  type FC, memo,
  type PropsWithChildren,
  useCallback, useEffect,
  useMemo,
  useState
} from 'react';
import cls from './Drawer.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { useSyntheticMounted } from '../../lib/hooks/utility/useSyntheticMounted/useSyntheticMounted';
import { useEscapeClose } from '../../lib/hooks/ui/useEscapeClose/useEscapeClose';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { DrawerProvider, useDrawerContext } from './drawerContext';
import { type DrawerPosition } from './position';
import { useDrawerPositionStyle } from './useDrawerPositionStyle';

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

const DEFAULT_Z_INDEX = 10;

export const Drawer: FC<DrawerProps> = memo(function Drawer (props) {
  const { onClose, open, contentClassName, position = 'right', } = props;
  const [closing, setClosing,] = useState<boolean>(false);
  const [localOpen, setLocalOpen,] = useState(false);
  const syntheticMounted = useSyntheticMounted(localOpen);
  const drawerContext = useDrawerContext();
  const contentStyle = useDrawerPositionStyle(position);
  const shouldRenderChildren =
    (!props.lazy || syntheticMounted) &&
    (localOpen || !props.removeContentWhenClosed || closing);

  const handleClose = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      setClosing(false);
      onClose();
      setLocalOpen(false);
    }, 200);
  }, [onClose,]);

  useEffect(function handleOutsideEvents () {
    const isClosedOutside = !open && localOpen && !closing;
    const isOpenedOutside = open && !localOpen;
    if (isClosedOutside) {
      handleClose();
    } else if (isOpenedOutside) {
      setLocalOpen(true);
    }
  }, [open, handleClose, localOpen, closing,]);

  useEscapeClose(handleClose, localOpen);

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
