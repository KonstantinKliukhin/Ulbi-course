import { forwardRef, type HTMLAttributes, memo } from 'react';

import cls from './MobileDrawerHeader.module.scss';

interface MobileDrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const MobileDrawerHeader = memo(forwardRef<HTMLDivElement, MobileDrawerHeaderProps>(
  function MobileDrawerHeader (
    { children, ...props },
    ref
  ) {
    return (
      <div className={cls.MobileDrawerHeader} {...props} ref={ref}>
        {children}
      </div>
    );
  }));
