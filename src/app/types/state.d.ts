type StateSchema = import('../providers/StoreProvider').StateSchema;
type AppDispatch = import('../providers/StoreProvider').AppDispatch;

interface ThunkExtraArg {
  api: typeof import('../../shared/api/api').$api;
  navigate: import('react-router-dom').NavigateFunction;
}

interface ThunkDefaultArg<T extends Record<string, any> = ThunkExtraArg> {
  extra: T;
  state: StateSchema;
}
