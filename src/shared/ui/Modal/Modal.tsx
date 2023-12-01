import { type FC, type PropsWithChildren, useCallback, useState } from 'react';
import cls from './Modal.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import { stopPropagation } from '../../lib/stopPropagation/stopPropagation';
import { useSyntheticMounted } from '../../lib/hooks/utility/useSyntheticMounted/useSyntheticMounted';
import { useEscapeClose } from '../../lib/hooks/ui/useEscapeClose/useEscapeClose';

interface ModalProps extends PropsWithChildren {
  className?: string
  contentClassName?: string
  open: boolean
  onClose: () => void
  lazy?: boolean
}

export const Modal: FC<ModalProps> = (props) => {
  const { onClose, open, contentClassName, lazy, } = props;
  const [closing, setClosing,] = useState<boolean>(false);
  const syntheticMounted = useSyntheticMounted(open);
  const handleClose = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  }, [onClose,]);
  useEscapeClose(handleClose, open);

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
        <div className={cls.overlay} onClick={handleClose}>
          <div
            className={classNames(cls.content, {}, [contentClassName,])}
            onClick={stopPropagation}
          >
            {props.children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
