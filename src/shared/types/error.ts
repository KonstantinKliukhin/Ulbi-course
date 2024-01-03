import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type SerializedError } from '@reduxjs/toolkit';

export interface IApiError<NativeError = Record<string, unknown>, Payload = undefined> {
  message: string;
  status: number | FetchBaseQueryError['status'];
  nativeMessage: string;
  nativeError: NativeError;
  payload?: Payload;
}

export type RealApiError<
  NativeError = Record<string, unknown>,
  Payload = undefined
> = IApiError<NativeError, Payload>;

export type RtkNativeError = FetchBaseQueryError | SerializedError | undefined;

export type RtkError = RealApiError<RtkNativeError>;
