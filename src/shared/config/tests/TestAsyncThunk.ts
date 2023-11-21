import { jest } from '@jest/globals';
import { type AsyncThunkAction } from '@reduxjs/toolkit';
import { type Dispatch } from 'redux';
import axios, { type AxiosStatic } from 'axios';
import { type StateSchema } from 'app/providers/StoreProvider';

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

jest.mock('axios');
const mockedApi = jest.mocked(axios);

export class TestAsyncThunk<Return, Arg, ThunkApiConfig extends AsyncThunkConfig> {
  dispatch: jest.MockedFunction<any>;
  getState: GetStateType<Return, Arg, ThunkApiConfig>;
  api: jest.MockedFunction<AxiosStatic>;
  navigate: jest.MockedFunction<any>;
  private readonly actionCreator: ActionCreatorType<Return, Arg, ThunkApiConfig>;

  constructor (
    actionCreator: ActionCreatorType<Return, Arg, ThunkApiConfig>,
    state?: DeepPartial<StateSchema>
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = (state ? () => state : jest.fn()) as GetStateType<Return, Arg, ThunkApiConfig>;
    this.api = mockedApi;
    this.navigate = jest.fn();
  }

  async callThunk (arg: Arg) {
    const extra =
            { api: this.api, navigate: this.navigate, } as unknown as ExtraType<Return, Arg, ThunkApiConfig>;
    const action = this.actionCreator(arg);
    return await action(this.dispatch, this.getState, extra);
  }
}
