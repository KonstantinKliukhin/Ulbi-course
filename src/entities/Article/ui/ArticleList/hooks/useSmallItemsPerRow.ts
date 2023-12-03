import { type MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useWindowEvent } from 'shared/lib';

const DEFAULT_SMALL_ITEMS_PER_ROW = 4;

export const useSmallItemsPerRow = (
  wrapperRef: MutableRefObject<HTMLDivElement | null>,
  smallItemsWidthWithGap: number
) => {
  const getSmallItemsPerRow = useCallback(
    () =>
      wrapperRef.current
        ? Math.floor(wrapperRef.current.offsetWidth / smallItemsWidthWithGap)
        : DEFAULT_SMALL_ITEMS_PER_ROW,
    [smallItemsWidthWithGap, wrapperRef,]
  );

  const [smallItemsPerRow, setSmallItemsPerRow,] = useState(
    DEFAULT_SMALL_ITEMS_PER_ROW
  );

  useEffect(() => {
    setSmallItemsPerRow(getSmallItemsPerRow());
    // eslint-disable-next-line
  }, []);

  useWindowEvent(
    'resize',
    useCallback(() => {
      setSmallItemsPerRow(getSmallItemsPerRow());
    }, [getSmallItemsPerRow,])
  );

  return smallItemsPerRow;
};
