import { useCallback, useEffect, useRef, useState } from 'react';
import { useEscapeClose } from '../useEscapeClose/useEscapeClose';
import { useSyntheticMounted } from '../../utils/useSyntheticMounted/useSyntheticMounted';

interface UseModalArg {
  open: boolean;
  lazy?: boolean;
  removeContentWhenClosed?: boolean;
  onClose: () => void;
  animationDelay: number;
}

export const useModal = (arg: UseModalArg) => {
  const { onClose, open, } = arg;
  const [closing, setClosing,] = useState<boolean>(false);
  const [localOpen, setLocalOpen,] = useState(false);
  const syntheticMounted = useSyntheticMounted(localOpen);
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const shouldRenderChildren =
    (!arg.lazy || syntheticMounted) &&
    (!arg.removeContentWhenClosed || localOpen || closing || open);

  const handleClose = useCallback((isClosedOutside?: boolean) => {
    setClosing(true);

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setClosing(false);
      if (!isClosedOutside) onClose();
      setLocalOpen(false);
    }, arg.animationDelay);
  }, [onClose, arg.animationDelay,]);

  useEffect(() => function clearTimer () {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(function handleOutsideEvents () {
    const isClosedOutside = !open && localOpen && !closing;
    const isOpenedOutside = open && !localOpen;
    if (isClosedOutside) {
      handleClose(isClosedOutside);
    } else if (isOpenedOutside) {
      setLocalOpen(true);
    }
  }, [open, handleClose, localOpen, closing,]);

  useEscapeClose(handleClose, localOpen);

  return { shouldRenderChildren, localOpen, closing, handleClose, };
};
