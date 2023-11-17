import { counterActions, counterReducer } from './counterSlice';
import { type CounterSchema } from '../types/CounterSchema';

describe('counterSlice', () => {
  test('decrement', () => {
    const state: DeepPartial<CounterSchema> = { value: 10, };

    expect(counterReducer(state as CounterSchema, counterActions.decrement()))
      .toEqual({ value: 9, });
  });

  test('increment', () => {
    const state: DeepPartial<CounterSchema> = { value: 10, };

    expect(counterReducer(state as CounterSchema, counterActions.increment()))
      .toEqual({ value: 11, });
  });

  test('should work with empty state', () => {
    expect(counterReducer(undefined, counterActions.increment()))
      .toEqual({ value: 1, });
  });
});
