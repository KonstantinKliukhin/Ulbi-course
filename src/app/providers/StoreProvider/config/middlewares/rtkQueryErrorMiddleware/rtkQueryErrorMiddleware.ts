import {
  type AnyAction,
  type Middleware,
  type MiddlewareAPI
} from '@reduxjs/toolkit';
import { normalizeRtkError } from '@/shared/lib';

export const rtkQueryErrorMiddleware: Middleware =
  (_: MiddlewareAPI) => (next) => (action: AnyAction) => {
    if (getIsRtkQueryRejectedAction(action)) {
      return next({ ...action, payload: normalizeRtkError(action.payload), });
    } else {
      return next(action);
    }
  };

function getIsRtkQueryRejectedAction (action: AnyAction): boolean {
  const isRtkQueryAction = action?.type?.startsWith('api/');
  const isError = action?.error?.message === 'Rejected';

  return isRtkQueryAction && isError;
}
