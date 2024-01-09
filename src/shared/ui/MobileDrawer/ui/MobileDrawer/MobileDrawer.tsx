import {
  memo,
  type PropsWithChildren, type ReactNode,
  useMemo
} from 'react';
import cls from './MobileDrawer.module.scss';
import { classNames } from '../../../../lib/classNames/classNames';
import { Portal } from '../../../Portal/Portal';
import { Overlay } from '../../../Overlay/Overlay';
import { useModal } from '../../../../lib/hooks/ui/useModal/useModal';
import { MobileDrawerSheet } from '../MobileDrawerSheet/MobileDrawerSheet';
import { MobileDrawerDndContext } from '../MobileDrawerDndContext/MobileDrawerDndContext';
import { DropRegions } from '../DropRegions/DropRegions';

interface MobileDrawerProps extends PropsWithChildren {
  className?: string;
  contentClassName?: string;
  open: boolean;
  onClose: () => void;
  lazy?: boolean;
  removeContentWhenClosed?: boolean;
  header?: ReactNode;
}

export const MobileDrawer = memo<MobileDrawerProps>(function MobileDrawer (props) {
  const { onClose, open, lazy, removeContentWhenClosed, } = props;
  const {
    localOpen,
    closing,
    shouldRenderChildren,
  } = useModal(useMemo(() => ({
    open,
    removeContentWhenClosed,
    lazy,
    onClose,
    animationDelay: 200,
  }), [lazy, onClose, open, removeContentWhenClosed,]));

  return (
    <MobileDrawerDndContext onClose={onClose}>
      <Portal>
        <div
          className={classNames(
            cls.MobileDrawer,
            { [cls.open]: localOpen, [cls.closing]: closing, },
            [props.className,]
          )}
        >
          <Overlay onClick={onClose} open={localOpen}/>
          <MobileDrawerSheet header={props.header} open={open}>
            <div className={classNames(cls.content, {}, [props.contentClassName,])}>
              {shouldRenderChildren ? props.children : null}
            </div>
          </MobileDrawerSheet>
          <DropRegions/>
        </div>
      </Portal>
    </MobileDrawerDndContext>
  );
});
