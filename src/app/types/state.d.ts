// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type StateSchema = import('../providers/StoreProvider').StateSchema;
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type AppDispatch = import('../providers/StoreProvider').AppDispatch;

interface ThunkExtraArg {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  api: typeof import('../../shared/api/api').$api
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  navigate: import('react-router-dom').NavigateFunction
}

interface ThunkDefaultArg<T extends Record<string, any> = ThunkExtraArg> {
  extra: T
  state: StateSchema
}
