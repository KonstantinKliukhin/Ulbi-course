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
import { type ArticleCommentsSchema } from 'pages/ArticleDetailsPage';
import { type ArticlesPageSchema } from 'pages/ArticlesPage';
import { type UISchema } from 'features/UI';
import { type ArticleRecommendationsSchema } from 'features/ArticleRecomemndations';
import { type ManageArticleSchema } from 'widgets/ManageArticle';

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  ui: UISchema
  // async schemas
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleComments?: ArticleCommentsSchema
  articlesPage?: ArticlesPageSchema
  articleRecommendations?: ArticleRecommendationsSchema
  manageArticle?: ManageArticleSchema
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
