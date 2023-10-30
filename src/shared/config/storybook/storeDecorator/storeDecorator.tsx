import { type FC, useContext, useLayoutEffect } from 'react';
import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { type DeepPartial, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit';
import { OptionalDecoratorsContext } from '../OptionalDecoratorsDecorator/OptionalDecoratorsDecorator';
import { loginReducer, type LoginSchema } from 'features/AuthByUsername';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer as Reducer<LoginSchema | undefined>,
};

export const StoreDecorator = (
  initialState: DeepPartial<StateSchema>,
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
) => {
  const mergedAsyncReducers = { ...defaultAsyncReducers, ...asyncReducers, };

  return function Component (Story: FC) {
    const { setIsCustomReduxStore, } = useContext(OptionalDecoratorsContext);

    useLayoutEffect(function removeGlobalStore () {
      setIsCustomReduxStore(true);
    }, [setIsCustomReduxStore,]);

    return (
      <StoreProvider initialState={initialState} asyncReducers={mergedAsyncReducers}>
        <Story/>
      </StoreProvider>
    );
  };
};
