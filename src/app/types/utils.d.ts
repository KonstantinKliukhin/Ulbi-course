type Values<T extends Record<string, any>> = T[keyof T];

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;
