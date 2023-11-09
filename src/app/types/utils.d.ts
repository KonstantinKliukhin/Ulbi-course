type Values<T extends Record<string, any>> = T[keyof T];
