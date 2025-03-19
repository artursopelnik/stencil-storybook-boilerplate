import { AriaAttributes, SelectedAriaAttributes } from '../types/aria-types';
import { parseJSONAttribute } from './utils';

export const parseAndGetAriaAttributes = (rawAttributes: AriaAttributes | string): AriaAttributes | undefined => {
  if (rawAttributes) {
    return Object.fromEntries(
      Object.entries(parseJSONAttribute(rawAttributes)).map(([key, val]) => [
        key,
        // convert booleans to strings so that values are properly set and not just result in attributes without a value when true in jsx
        typeof val === 'boolean' ? `${val}` : val,
      ]),
    );
  }
  return undefined;
};

export const getAriaAttributes = <T extends keyof AriaAttributes>(aria: SelectedAriaAttributes<T>): AriaAttributes => {
  return {
    ...parseAndGetAriaAttributes(aria),
  };
};
