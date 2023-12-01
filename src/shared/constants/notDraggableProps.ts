import { stopPropagation } from '../lib/stopPropagation/stopPropagation';
import { type HTMLAttributes } from 'react';

export const NOT_DRAGGRABLE_PROPS: HTMLAttributes<HTMLElement> = {
  onPointerDown: stopPropagation,
  onTouchStart: stopPropagation,
  onMouseDown: stopPropagation,
};
