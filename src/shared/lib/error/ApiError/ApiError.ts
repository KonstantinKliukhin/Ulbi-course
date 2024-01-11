import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type IApiError } from '../../../types/error';

export class ApiError<NativeError = Record<string, unknown>, Payload = undefined>
implements IApiError<NativeError, Payload> {
  constructor (
    public message: string,
    public status: number | FetchBaseQueryError['status'],
    public nativeMessage: string,
    public nativeError: NativeError,
    public payload?: Payload
  ) {}
}
