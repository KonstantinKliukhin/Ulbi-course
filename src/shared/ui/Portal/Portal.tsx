import { type FC, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps extends PropsWithChildren {
  element?: HTMLElement
}

export const Portal: FC<PortalProps> = props => {
  return createPortal(props.children, props.element ?? document.body);
};
