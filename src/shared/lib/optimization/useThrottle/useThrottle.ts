import { useCallback, useEffect, useRef } from 'react';

export const useThrottle =
    <Callback extends (...args: any[]) => any>(callback: Callback, delay: number): Callback => {
      const throttleRef = useRef<boolean>(false);
      const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

      useEffect(() => () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }, []);

      return useCallback((...args: Parameters<Callback>): ReturnType<Callback> | undefined => {
        if (!throttleRef.current) {
          throttleRef.current = true;

          timeoutRef.current = setTimeout(() => {
            throttleRef.current = false;
            timeoutRef.current = null;
          }, delay);

          return callback(...args);
        }
      }, [delay, callback,]) as Callback;
    };
