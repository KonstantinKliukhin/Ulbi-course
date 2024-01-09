import { useCallback, useState } from 'react';

export const useBoolState = (initialValue = false) => {
  const [boolState, setBoolState,] = useState(initialValue);

  const enable = useCallback(() => {
    setBoolState(true);
  }, []);

  const disable = useCallback(() => {
    setBoolState(false);
  }, []);

  const toggle = useCallback(() => {
    setBoolState(prevState => !prevState);
  }, []);

  return { boolState, enable, disable, toggle, };
};
