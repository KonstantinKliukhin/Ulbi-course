export const findById = <T extends { id: string | number }>(arr: T[], id: string | number): T | null => (
  arr.find(item => item.id === id) ?? null
);
