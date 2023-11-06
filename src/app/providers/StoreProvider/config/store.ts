import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { type ReduxStoreWithManager, type StateSchema } from './StateSchema';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager';
import { $api } from 'shared/api';
import { type NavigateFunction } from 'react-router-dom';

export function createReduxStore (
  navigate: NavigateFunction,
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
): ReduxStoreWithManager {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const thunkExtraArg: ThunkExtraArg = {
    api: $api,
    navigate,
  };

  return {
    ...configureStore({
      reducer: reducerManager.reduce,
      devTools: __IS_DEV__,
      preloadedState: initialState,
      middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: { extraArgument: thunkExtraArg, },
      }),
    }),
    reducerManager,
  };
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
