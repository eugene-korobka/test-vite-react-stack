export function peekDefinedPropertiesByTemplate(source, template) {
  return Object
    .keys(template)
    .reduce((acc, key) => {
      const value = source[key];

      if (value !== undefined) {
        acc[key] = value;
      }

      return acc;
    }, {});
}
