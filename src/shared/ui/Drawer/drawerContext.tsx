import { createContext, type FC, type PropsWithChildren, useContext, useMemo } from 'react';

interface DrawerContext {
  nestedLevel: number;
}

const drawerContext = createContext<DrawerContext>({ nestedLevel: 0, });

export const useDrawerContext = () => useContext(drawerContext);

export const DrawerProvider: FC<PropsWithChildren> = (props) => {
  const { nestedLevel, } = useDrawerContext();

  const contextValue = useMemo<DrawerContext>(
    () => ({
      nestedLevel: nestedLevel + 1,
    }),
    [nestedLevel,]
  );

  return (
    <drawerContext.Provider value={contextValue}>
      {props.children}
    </drawerContext.Provider>
  );
};
