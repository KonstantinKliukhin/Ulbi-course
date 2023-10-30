import { type AnyAction, combineReducers, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit';
import { type ReducerManager, type StateSchema } from './StateSchema';

export function createReducerManager (initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
  const reducers = { ...initialReducers, };
  let combinedReducer = combineReducers(reducers);

  let keysToRemove: Array<keyof StateSchema> = [];
  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchema | undefined, action: AnyAction) => {
      if (state && keysToRemove.length > 0) {
        state = { ...state, };
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }
      return combinedReducer(state, action);
    },
    add: (key: keyof StateSchema, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: keyof StateSchema) => {
      if (!key || !reducers[key]) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
