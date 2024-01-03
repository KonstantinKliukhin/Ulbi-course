import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type RtkError, type RtkNativeError } from '../../../types/error';
import { COMMON_API_ERRORS } from '../../../constants/commonApiErrors';
import { ApiError } from '../ApiError/ApiError';

export const normalizeRtkError = (
  rtkError: RtkNativeError
): null | RtkError => {
  if (getIsFetchBaseQueryError(rtkError)) {
    const errMsg =
      'error' in rtkError ? rtkError.error : JSON.stringify(rtkError.data);

    return new ApiError(COMMON_API_ERRORS.UNKNOWN_ERROR, rtkError.status, errMsg, rtkError);
  } else if (getIsErrorWithMessage(rtkError)) {
    return new ApiError(COMMON_API_ERRORS.UNKNOWN_ERROR, 'CUSTOM_ERROR', rtkError.message, rtkError);
  } else {
    return null;
  }
};

function getIsFetchBaseQueryError (
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

function getIsErrorWithMessage (
  error: unknown
): error is { message: string } {
  return (
    typeof error === 'object' &&
        error != null &&
        'message' in error &&
        typeof (error as any).message === 'string'
  );
}
