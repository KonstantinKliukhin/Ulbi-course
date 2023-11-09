const MAX_VALID_AGE_LENGTH = 3;

export const validateAge = (value: string): boolean => {
  const numberValue = Number(value);
  const isNumber = !Number.isNaN(numberValue);
  const isInRange = value.length <= MAX_VALID_AGE_LENGTH;

  return isNumber && isInRange;
};
