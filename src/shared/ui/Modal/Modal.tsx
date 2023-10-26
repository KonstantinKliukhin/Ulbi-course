import { type FC, type PropsWithChildren, useCallback, useEffect, useState } from 'react';
import cls from './Modal.module.scss';
import { classNames, stopPropagation } from 'shared/lib';
import { Portal } from 'shared/ui';

interface ModalProps extends PropsWithChildren {
  className?: string
  contentClassName?: string
  open: boolean
  onClose: () => void
}

export const Modal: FC<ModalProps> = props => {
  const { onClose, open, contentClassName, } = props;

  const [closing, setClosing,] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  }, [onClose,]);

  const closeHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  }, [handleClose,]);

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', closeHandler);
    }

    return () => {
      window.removeEventListener('keydown', closeHandler);
    };
  }, [closeHandler, open,]);

  return (
    <Portal>
      <div
        className={classNames(
          cls.Modal,
          { [cls.open]: props.open, [cls.closing]: closing, },
          [props.className,]
        )}>
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
