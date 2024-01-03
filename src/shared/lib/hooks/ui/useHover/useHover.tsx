import { useCallback, useMemo, useState } from 'react';

interface HoverBounds {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type UseHoverResult = [
  boolean,
  HoverBounds
];

export const useHover = (): UseHoverResult => {
  const [isHover, setIsHover,] = useState<boolean>(false);

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return useMemo(() => [
    isHover,
    { onMouseEnter, onMouseLeave, },
  ], [isHover, onMouseLeave, onMouseEnter,]);
};
