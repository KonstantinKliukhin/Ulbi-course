import { type StateSchema } from '@/app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue', () => {
  test('should return counter state value', () => {
    const state: DeepPartial<StateSchema> = {
      counter: { value: 10, },
    };

    expect(getCounterValue(state as StateSchema)).toEqual(10);
  });
});
