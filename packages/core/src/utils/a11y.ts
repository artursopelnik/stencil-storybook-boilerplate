import { AriaAttributes } from '../types';
import { parseJSONAttribute } from './utils';

const isValidAriaKey = (key: string): boolean => key.startsWith('aria') || key === 'role';

const isValidAriaValue = (val: unknown): val is string | boolean => ['string', 'boolean'].includes(typeof val);

const parseAriaAttributes = (rawAttributes: AriaAttributes | string): AriaAttributes | undefined =>
  rawAttributes ? Object.fromEntries(Object.entries(parseJSONAttribute(rawAttributes)).map(([key, val]) => [key, typeof val === 'boolean' ? `${val}` : val])) : undefined;

export const getAriaAttributes = (selectedAria: AriaAttributes | string): AriaAttributes => {
  const aria = parseAriaAttributes(selectedAria);

  if (typeof aria !== 'object') {
    console.error('Invalid ARIA attributes: Expected an object');
    return {};
  }

  return Object.entries(aria).reduce((result, [key, val]) => {
    if (isValidAriaKey(key) && isValidAriaValue(val)) {
      result[key] = typeof val === 'boolean' ? `${val}` : val;
    } else {
      console.error(`Invalid ARIA attribute or value: ${key}`);
    }
    return result;
  }, {});
};
