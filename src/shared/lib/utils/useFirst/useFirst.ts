import { useRef } from 'react';

export const useFirst = <T>(value: T): T => {
  const valueRef = useRef<T | null>(null);

  if (valueRef.current === null) {
    valueRef.current = value;

    return value;
  } else {
    return valueRef.current;
  }
};
