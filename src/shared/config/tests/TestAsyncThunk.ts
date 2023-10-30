import { jest } from '@jest/globals';
import { type AsyncThunkAction } from '@reduxjs/toolkit';
import { type Dispatch } from 'redux';

// Redux not exported type
interface AsyncThunkConfig {
  state?: unknown
  dispatch?: Dispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
  pendingMeta?: unknown
  fulfilledMeta?: unknown
  rejectedMeta?: unknown
}

type ActionCreatorType<Return, Arg, ThunkApiConfig extends AsyncThunkConfig>
    = (arg: Arg) => AsyncThunkAction<Return, Arg, ThunkApiConfig>;

type ActionParametersType<Return, Arg, ThunkApiConfig extends AsyncThunkConfig>
    = Parameters<ReturnType<ActionCreatorType<Return, Arg, ThunkApiConfig>>>;

type ExtraType<Return, Arg, ThunkApiConfig extends AsyncThunkConfig> =
    ActionParametersType<Return, Arg, ThunkApiConfig>[2];

type GetStateType<Return, Arg, ThunkApiConfig extends AsyncThunkConfig>
    = ActionParametersType<Return, Arg, ThunkApiConfig>[1];

export class TestAsyncThunk<Return, Arg, ThunkApiConfig extends AsyncThunkConfig> {
  dispatch: jest.MockedFunction<any>;
  getState: GetStateType<Return, Arg, ThunkApiConfig>;
  private readonly actionCreator: ActionCreatorType<Return, Arg, ThunkApiConfig>;

  constructor (actionCreator: ActionCreatorType<Return, Arg, ThunkApiConfig>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn() as GetStateType<Return, Arg, ThunkApiConfig>;
  }

  async callThunk (arg: Arg) {
    const extra = undefined as ExtraType<Return, Arg, ThunkApiConfig>;
    const action = this.actionCreator(arg);
    return await action(this.dispatch, this.getState, extra);
  }
}
