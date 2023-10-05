type Mods = Record<string, any>;

export function classNames (
  cls: string,
  mods?: Mods,
  additional?: Array<string | undefined | null>
): string {
  return [
    cls,
    ...Object.entries(mods || {})
      .filter(([_, value,]) => Boolean(value))
      .map(([cls,]) => cls),
    ...(additional ? additional.filter(Boolean) : []),
  ].join(' ');
}
