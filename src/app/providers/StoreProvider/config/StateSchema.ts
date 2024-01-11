import { type UserSchema } from '@/entities/User';
import { type LoginSchema } from '@/features/AuthByUsername';
import {
  type AnyAction,
  type CombinedState,
  type EnhancedStore,
  type Reducer,
  type ReducersMapObject
} from '@reduxjs/toolkit';
import { type ArticlesPageSchema } from '@/pages/ArticlesPage';
import { type UISchema } from '@/features/UI';
import { type ManageArticleSchema } from '@/widgets/ManageArticle';
import { type $rtkApi } from '@/shared/api';
import { type ProfilePageSchema } from '@/pages/ProfilePage';

export interface StateSchema {
  [$rtkApi.reducerPath]: ReturnType<typeof $rtkApi.reducer>;
  user: UserSchema;
  ui: UISchema;
  // async schemas
  loginForm?: LoginSchema;
  profilePage?: ProfilePageSchema;
  articlesPage?: ArticlesPageSchema;
  manageArticle?: ManageArticleSchema;
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema | undefined, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: keyof StateSchema, reducer: Reducer) => void;
  remove: (key: keyof StateSchema) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}
