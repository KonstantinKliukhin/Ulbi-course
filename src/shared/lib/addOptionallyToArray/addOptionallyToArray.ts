export const addOptionallyToArray = <Value>(options: boolean | boolean[], value: Value): [Value] | [] => {
  if (Array.isArray(options)) {
    return (options.every(option => option)) ? [value,] : [];
  } else {
    return options ? [value,] : [];
  }
};
