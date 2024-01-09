import { type MutableRefObject, useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): MutableRefObject<T> => {
  const prevValue = useRef<T>(value);

  useEffect(() => {
    prevValue.current = value;
  }, [value,]);

  return prevValue;
};
