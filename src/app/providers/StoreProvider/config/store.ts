import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { type ReduxStoreWithManager, type StateSchema } from './StateSchema';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager';

export function createReduxStore (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
): ReduxStoreWithManager {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  return {
    ...configureStore<StateSchema>({
      reducer: reducerManager.reduce,
      devTools: __IS_DEV__,
      preloadedState: initialState,
    }),
    reducerManager,
  };
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
