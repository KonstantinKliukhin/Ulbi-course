import { type FC, useContext, useLayoutEffect } from 'react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { type DeepPartial } from '@reduxjs/toolkit';
import {
  OptionalDecoratorsContext
} from 'shared/config/storybook/OptionalDecoratorsDecorator/OptionalDecoratorsDecorator';

export const StoreDecorator = (initialState: DeepPartial<StateSchema>) =>
  function Component (Story: FC) {
    const { setIsCustomReduxStore, } = useContext(OptionalDecoratorsContext);

    useLayoutEffect(function removeGlobalStore () {
      setIsCustomReduxStore(true);
    }, [setIsCustomReduxStore,]);

    return (
      <StoreProvider initialState={initialState}>
        <Story/>
      </StoreProvider>
    );
  };
