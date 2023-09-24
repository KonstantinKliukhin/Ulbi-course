type Mods = Record<string, boolean | string>

export function classNames (cls: string, mods: Mods, additional: Array<string | undefined | null>): string {
  return [
    cls,
    ...additional.filter(Boolean),
    Object.entries(mods)
      .map(([cls, value]) => value ? cls : '')]
    .join(' ')
}
