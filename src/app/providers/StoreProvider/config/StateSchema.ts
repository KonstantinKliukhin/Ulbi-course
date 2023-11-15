import { type CounterSchema } from 'entities/Counter';
import { type UserSchema } from 'entities/User';
import { type LoginSchema } from 'features/AuthByUsername';
import {
  type AnyAction,
  type CombinedState,
  type EnhancedStore,
  type Reducer,
  type ReducersMapObject
} from '@reduxjs/toolkit';
import { type ProfileSchema } from 'entities/Profile';
import { type ArticleDetailsSchema } from 'entities/Article';

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  // async schemas
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema | undefined, action: AnyAction) => CombinedState<StateSchema>
  add: (key: keyof StateSchema, reducer: Reducer) => void
  remove: (key: keyof StateSchema) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}
