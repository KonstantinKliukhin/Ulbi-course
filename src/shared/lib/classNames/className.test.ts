import { classNames } from './classNames'

describe('classNames', () => {
  test('if only main class provided should return it', () => {
    expect(classNames('mainClass')).toBe('mainClass')
  })

  test('if main class provided and additional classes then should return them', () => {
    expect(classNames('mainClass', {}, ['additionalClass1', 'additionalClass2']))
      .toBe('mainClass additionalClass1 additionalClass2')
  })

  test('if main class provided and mods classes with true provided, then should return them', () => {
    expect(classNames(
      'mainClass',
      { modClass1: true, modClass2: true },
      ['additionalClass1', 'additionalClass2']
    ))
      .toBe('mainClass modClass1 modClass2 additionalClass1 additionalClass2')
  })

  test('if mods classes provided with truly and falsy values should correct convert them to boolean', () => {
    expect(classNames(
      'mainClass',
      {
        modClass1: 1,
        modClass2: [],
        modClass3: {},
        modeClass4: 'str',
        modeClass5: () => null,
        modeClass6: undefined,
        modeClass7: 0,
        modeClass8: '',
        modeClass9: NaN,
        modeClass10: null,
      },
    ))
      .toBe('mainClass modClass1 modClass2 modClass3 modeClass4 modeClass5')
  })
})
