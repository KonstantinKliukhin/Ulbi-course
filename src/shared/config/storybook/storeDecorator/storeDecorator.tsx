import { type FC, useContext, useLayoutEffect } from 'react';
import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { type ReducersMapObject } from '@reduxjs/toolkit';
import { OptionalDecoratorsContext } from '../OptionalDecoratorsProvider/OptionalDecoratorsProvider';

export const StoreDecorator = (
  initialState: DeepPartial<StateSchema>,
  asyncReducers?: DeepPartial<ReducersMapObject<Required<StateSchema>>>
) => {
  const mergedAsyncReducers = { ...asyncReducers, };

  return function Component (Story: FC) {
    const { setIsCustomReduxStore, } = useContext(OptionalDecoratorsContext);

    useLayoutEffect(
      function removeGlobalStore () {
        setIsCustomReduxStore(true);
      },
      [setIsCustomReduxStore,]
    );

    return (
      <StoreProvider
        initialState={initialState}
        asyncReducers={
          mergedAsyncReducers as DeepPartial<ReducersMapObject<StateSchema>>
        }
      >
        <Story />
      </StoreProvider>
    );
  };
};
