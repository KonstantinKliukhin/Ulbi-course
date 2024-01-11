import { jest } from '@jest/globals';
import type { AsyncThunkAction } from '@reduxjs/toolkit';
import type { Dispatch } from 'redux';
import axios, { type AxiosStatic } from 'axios';
import { setupApiStore } from './setupApiStore';

// Redux not exported type
interface AsyncThunkConfig {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
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
  dispatch: jest.MockedFunction<any> = jest.fn();
  getState: GetStateType<Return, Arg, ThunkApiConfig>;
  api: jest.MockedFunction<AxiosStatic> = mockedApi;
  navigate: jest.MockedFunction<any> = jest.fn();
  private readonly actionCreator: ActionCreatorType<Return, Arg, ThunkApiConfig>;

  constructor (
    actionCreator: ActionCreatorType<Return, Arg, ThunkApiConfig>,
    getState: () => DeepPartial<StateSchema> | jest.MockedFunction<any> = jest.fn()
  ) {
    this.actionCreator = actionCreator;
    this.getState = getState as GetStateType<Return, Arg, ThunkApiConfig>;
  }

  async callThunk (arg: Arg) {
    const extra =
            { api: this.api, navigate: this.navigate, } as unknown as ExtraType<Return, Arg, ThunkApiConfig>;
    const action = this.actionCreator(arg);

    return action(this.dispatch, this.getState, extra);
  }
}

export class TestApiAsyncThunk<Return, Arg, ThunkApiConfig extends AsyncThunkConfig>
  extends TestAsyncThunk<Return, Arg, ThunkApiConfig> {
  store: ReturnType<typeof setupApiStore>['store'];

  constructor (
    actionCreator: ActionCreatorType<Return, Arg, ThunkApiConfig>,
    ...setupApiStoreArgs: Parameters<typeof setupApiStore>
  ) {
    const storeRef = setupApiStore(...setupApiStoreArgs);

    super(actionCreator, storeRef.store.getState);

    this.dispatch = storeRef.store.dispatch;
    this.store = storeRef.store;

    // @ts-expect-error ts invalid error
    jest.spyOn(this, 'dispatch');
    // @ts-expect-error ts invalid error
    jest.spyOn(this, 'getState');
  }
}
