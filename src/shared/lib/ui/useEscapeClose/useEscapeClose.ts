import { useCallback } from 'react';
import { useWindowEvent } from '../useWindowEvent/useWindowEvent';
import { useEvent } from '../../optimization/useEvent/useEvent';

export const useEscapeClose = (handleClose: () => void, isOpen: boolean) => {
  const handleCloseAction = useEvent(handleClose);

  const closeHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleCloseAction();
    },
    [handleCloseAction, isOpen,]
  );

  useWindowEvent('keydown', closeHandler);
};
