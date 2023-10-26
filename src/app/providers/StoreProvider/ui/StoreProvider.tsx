import { type FC, type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { type StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { type DeepPartial } from '@reduxjs/toolkit';

interface StoreProviderProps extends PropsWithChildren {
  initialState?: DeepPartial<StateSchema>
}

export const StoreProvider: FC<StoreProviderProps> = props => {
  const appStore = createReduxStore(props.initialState as StateSchema);

  return (
    <Provider store={appStore}>
      {props.children}
    </Provider>
  );
};
