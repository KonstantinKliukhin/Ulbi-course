import { type FC, type PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps extends PropsWithChildren {
  element?: HTMLElement
}

export const Portal: FC<PortalProps> = props => {
  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    elementRef.current = props.element ?? document.querySelector('.app');
  }, [props.element,]);

  if (!elementRef.current) return <>{props.children}</>;

  return createPortal(props.children, elementRef.current);
};
