import { type FC, type PropsWithChildren, useMemo } from 'react';
import cls from './Modal.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import { Portal } from '../Portal/Portal';
import { stopPropagation } from '../../lib/ui/stopPropagation/stopPropagation';
import { Overlay } from '../Overlay/Overlay';
import { Flex } from '../Stack/Flex/Flex';
import { useModal } from '../../lib/ui/useModal/useModal';

interface ModalProps extends PropsWithChildren {
  className?: string;
  contentClassName?: string;
  open: boolean;
  onClose: () => void;
  lazy?: boolean;
  removeContentWhenClosed?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
  const { onClose, open, contentClassName, lazy, removeContentWhenClosed, } = props;
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

  return (
    <Portal>
      <Flex justify="center"
        align="center"
        className={classNames(
          cls.Modal,
          { [cls.open]: localOpen, [cls.closing]: closing, },
          [props.className,]
        )}
      >
        <Overlay open={localOpen} onClick={handleClose}/>
        <div
          className={classNames(cls.content, {}, [contentClassName,])}
          onClick={stopPropagation}
        >
          {shouldRenderChildren ? props.children : null}
        </div>
      </Flex>
    </Portal>
  );
};
