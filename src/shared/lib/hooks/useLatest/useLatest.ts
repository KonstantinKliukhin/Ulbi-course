import { type MutableRefObject, useLayoutEffect, useRef } from 'react';

export const useLatest = <Value>(value: Value): MutableRefObject<Value> => {
  const valueRef = useRef<Value>(value);

  useLayoutEffect(() => {
    valueRef.current = value;
  });

  return valueRef;
};
