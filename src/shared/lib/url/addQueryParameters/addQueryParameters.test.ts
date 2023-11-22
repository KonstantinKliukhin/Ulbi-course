import { getQueryParams } from './addQueryParameters';

describe('addQueryParams', () => {
  test('test with one param', () => {
    expect(getQueryParams({ some: '1', })).toBe('?some=1');
  });

  test('test with multiple params', () => {
    const params: Record<string, string> = {
      first: 'first',
      second: 'second',
      third: 'third',
    };
    expect(getQueryParams(params)).toBe('?first=first&second=second&third=third');
  });

  test('test with undefined param', () => {
    const params = {
      first: 'first',
      second: 'second',
      third: undefined,
    };

    expect(getQueryParams(params)).toBe('?first=first&second=second');
  });
});
