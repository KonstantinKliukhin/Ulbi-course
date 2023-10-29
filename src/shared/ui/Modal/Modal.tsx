import { type FC, type PropsWithChildren, useCallback, useEffect, useState } from 'react';
import cls from './Modal.module.scss';
import { classNames, stopPropagation } from 'shared/lib';
import { Portal } from 'shared/ui';

interface ModalProps extends PropsWithChildren {
  className?: string
  contentClassName?: string
  open: boolean
  onClose: () => void
  lazy?: boolean
}

export const Modal: FC<ModalProps> = props => {
  const { onClose, open, contentClassName, lazy, } = props;
  const [closing, setClosing,] = useState<boolean>(false);
  const [syntheticMounted, setSyntheticMounted,] = useState(false);
  const handleClose = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  }, [onClose,]);

  useEffect(function syntheticMount () {
    if (open) {
      setSyntheticMounted(true);
    }
  }, [open,]);

  const closeHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  }, [handleClose,]);

  useEffect(function closeOnEscapeHandler () {
    if (open) {
      window.addEventListener('keydown', closeHandler);
    }

    return () => {
      window.removeEventListener('keydown', closeHandler);
    };
  }, [closeHandler, open,]);

  if (lazy && !syntheticMounted) return null;

  return (
    <Portal>
      <div
        className={classNames(
          cls.Modal,
          { [cls.open]: props.open, [cls.closing]: closing, },
          [props.className,]
        )}
      >
        <div className={cls.overlay} onClick={props.onClose}>
          <div
            className={classNames(cls.content, {}, [contentClassName,])}
            onClick={stopPropagation()}
          >
            {props.children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
