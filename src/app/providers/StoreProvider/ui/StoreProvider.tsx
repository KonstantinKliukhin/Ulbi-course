import { type FC, type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { type StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { type DeepPartial, type ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderProps extends PropsWithChildren {
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: FC<StoreProviderProps> = props => {
  const appStore = createReduxStore(
    props.initialState as StateSchema,
    props.asyncReducers as ReducersMapObject<StateSchema>
  );

  return (
    <Provider store={appStore}>
      {props.children}
    </Provider>
  );
};
