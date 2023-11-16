import { useEffect } from 'react';

export const useInitialEffect = (cb: () => void) => {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      cb();
    }
  }, [cb,]);
};
