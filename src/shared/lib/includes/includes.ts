export const includes = <T extends Array<string | number>>
  (value: any, allItems: T): value is T[number] => (
    allItems.includes(value)
  );
