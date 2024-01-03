import { createContext, type FC, useState } from 'react';

interface OptionalDecorators {
  isCustomReduxStore: boolean;
  setIsCustomReduxStore: (value: boolean) => void;
}

const initialState: OptionalDecorators = {
  isCustomReduxStore: false,
  setIsCustomReduxStore: () => '',
};

export const OptionalDecoratorsContext = createContext<OptionalDecorators>(initialState);

export const OptionalDecoratorsProvider = (Story: FC) => {
  const [isCustomReduxStore, setIsCustomReduxStore,] = useState(false);

  const contextValue = { isCustomReduxStore, setIsCustomReduxStore, };

  return (
    <OptionalDecoratorsContext.Provider value={contextValue}>
      <Story/>
    </OptionalDecoratorsContext.Provider>
  );
};
