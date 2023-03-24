export function peekDefinedPropertiesByTemplate<E>(source: E, template: Record<string, unknown>) {
  return Object
    .keys(template)
    .reduce((acc: E, key: string) => {
      const value = source[key];

      if (value !== undefined) {
        acc[key] = value;
      }

      return acc;
    }, {} as E);
}
