export const addOptionallyToArray = <Value>(option: boolean, value: Value): [Value] | [] => {
  return option ? [value,] : [];
};
