export const findIndexById = <T extends { id: string | number }>(arr: T[], id: string | number): number => (
  arr.findIndex(item => item.id === id)
);
