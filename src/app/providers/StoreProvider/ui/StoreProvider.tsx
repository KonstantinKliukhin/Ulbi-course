import { type FC, type PropsWithChildren, useMemo } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { type StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { type ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

interface StoreProviderProps extends PropsWithChildren {
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: FC<StoreProviderProps> = props => {
  const navigate = useNavigate();
  const appStore = useMemo(() => createReduxStore(
    navigate,
    props.initialState as StateSchema,
    props.asyncReducers as ReducersMapObject<StateSchema>
  ), [props.initialState, props.asyncReducers, navigate,]);

  return (
    <Provider store={appStore}>
      {props.children}
    </Provider>
  );
};
