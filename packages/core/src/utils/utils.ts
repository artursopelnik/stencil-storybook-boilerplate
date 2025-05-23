export function format(first?: string, middle?: string, last?: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const parseJSONAttribute = <T>(attribute: T | string): T => {
  // Input is object, e.g. { 'aria-label': 'Some label' }
  if (typeof attribute !== 'string') {
    return attribute;
  }

  return JSON.parse(
    attribute
      // Convert single quotes to double quotes except the ones which are escaped by backslash
      .replace(/\\'/g, '__escaped_single_quote__')
      .replace(/'/g, '"')
      .replace(/__escaped_single_quote__/g, "\\'")
      // Remove string escapes except the ones followed by unicode u0027
      .replace(/([^\\])\\(?!u0027)/g, '$1')
      // Wrap keys in double quotes
      .replace(/[\s"]?([\w-]+)[\s"]?:/g, '"$1":'),
  );
};
