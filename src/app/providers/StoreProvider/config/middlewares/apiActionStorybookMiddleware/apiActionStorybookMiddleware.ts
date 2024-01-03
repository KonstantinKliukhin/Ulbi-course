import {
  type AnyAction,
  type Middleware,
  type MiddlewareAPI
} from '@reduxjs/toolkit';

export const apiActionStorybookMiddleware: Middleware =
    (_: MiddlewareAPI) => (next) => (action: AnyAction) => {
      const isApiAction = action.type.startsWith('api/');

      if (isApiAction) {
        return next({ type: 'mock', });
      } else {
        return next(action);
      }
    };
