export const parseJSON = <T, F = undefined> (value: string | null, fallbackValue?: F): T | F | undefined => {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log('parsing error on', { value, });

    return fallbackValue;
  }
};
