import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { type ReduxStoreWithManager, type StateSchema } from './StateSchema';
import { userReducer } from '@/entities/User';
import { createReducerManager } from './reducerManager';
import { $api, $rtkApi } from '@/shared/api';
import { type NavigateFunction } from 'react-router-dom';
import { UIReducer } from '@/features/UI';
import { rtkQueryErrorMiddleware } from './middlewares/rtkQueryErrorMiddleware/rtkQueryErrorMiddleware';

export function createReduxStore (
  navigate: NavigateFunction,
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
): ReduxStoreWithManager {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    ui: UIReducer,
    [$rtkApi.reducerPath]: $rtkApi.reducer,
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
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: { extraArgument: thunkExtraArg, },
          serializableCheck: false,
        })
          .concat($rtkApi.middleware)
          .concat(rtkQueryErrorMiddleware),
    }),
    reducerManager,
  };
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
