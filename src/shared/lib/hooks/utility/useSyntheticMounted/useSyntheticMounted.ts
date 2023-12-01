import { useEffect, useState } from 'react';

export const useSyntheticMounted = (open: boolean) => {
  const [syntheticMounted, setSyntheticMounted,] = useState(false);
  useEffect(function syntheticMount () {
    if (open) {
      setSyntheticMounted(true);
    }
  }, [open,]);

  return syntheticMounted;
};
