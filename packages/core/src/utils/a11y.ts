import { AriaAttributes, SelectedAriaAttributes } from '../types';
import { parseJSONAttribute } from './utils';

export enum ARIA {
  AriaActiveDescendant = 'aria-activedescendant',
  AriaAtomic = 'aria-atomic',
  AriaAutocomplete = 'aria-autocomplete',
  AriaBraillelabel = 'aria-braillelabel',
  AriaBrailleroledescription = 'aria-brailleroledescription',
  AriaBusy = 'aria-busy',
  AriaChecked = 'aria-checked',
  AriaColcount = 'aria-colcount',
  AriaColindex = 'aria-colindex',
  AriaColindextext = 'aria-colindextext',
  AriaColspan = 'aria-colspan',
  AriaControls = 'aria-controls',
  AriaCurrent = 'aria-current',
  AriaDescribedby = 'aria-describedby',
  AriaDescription = 'aria-description',
  AriaDetails = 'aria-details',
  AriaDisabled = 'aria-disabled',
  AriaDropeffect = 'aria-dropeffect',
  AriaErrormessage = 'aria-errormessage',
  AriaExpanded = 'aria-expanded',
  AriaFlowto = 'aria-flowto',
  AriaGrabbed = 'aria-grabbed',
  AriaHaspopup = 'aria-haspopup',
  AriaHidden = 'aria-hidden',
  AriaInvalid = 'aria-invalid',
  AriaKeyshortcuts = 'aria-keyshortcuts',
  AriaLabel = 'aria-label',
  AriaLabelledby = 'aria-labelledby',
  AriaLevel = 'aria-level',
  AriaLive = 'aria-live',
  AriaModal = 'aria-modal',
  AriaMultiline = 'aria-multiline',
  AriaMultiselectable = 'aria-multiselectable',
  AriaOrientation = 'aria-orientation',
  AriaOwns = 'aria-owns',
  AriaPlaceholder = 'aria-placeholder',
  AriaPosinset = 'aria-posinset',
  AriaPressed = 'aria-pressed',
  AriaReadonly = 'aria-readonly',
  AriaRelevant = 'aria-relevant',
  AriaRequired = 'aria-required',
  AriaRoledescription = 'aria-roledescription',
  AriaRowcount = 'aria-rowcount',
  AriaRowindex = 'aria-rowindex',
  AriaRowindextext = 'aria-rowindextext',
  AriaRowspan = 'aria-rowspan',
  AriaSelected = 'aria-selected',
  AriaSetsize = 'aria-setsize',
  AriaSort = 'aria-sort',
  AriaValuemax = 'aria-valuemax',
  AriaValuemin = 'aria-valuemin',
  AriaValuenow = 'aria-valuenow',
  AriaValuetext = 'aria-valuetext',
  Role = 'role',
}

const isValidAriaKey = (key: string): key is keyof typeof ARIA => Object.values(ARIA).includes(key as ARIA);

const isValidAriaValue = (val: unknown): val is string | number | boolean => ['string', 'number', 'boolean'].includes(typeof val);

export const parseAndGetAriaAttributes = (rawAttributes: AriaAttributes | string): AriaAttributes | undefined =>
  rawAttributes
    ? Object.fromEntries(
        Object.entries(parseJSONAttribute(rawAttributes))
          .map(([key, val]) => [key, typeof val === 'boolean' ? `${val}` : val])
          .filter(([, val]) => val !== undefined),
      )
    : undefined;

export const validateAriaAttributes = (attributes: Record<string, string | number | boolean>): boolean =>
  Object.entries(attributes).every(([key, val]) => {
    const valid = isValidAriaKey(key) && isValidAriaValue(val);
    if (!valid) console.error(`Invalid ARIA attribute or value: ${key} = ${val}`);
    return valid;
  });

export const getAriaAttributes = <T extends keyof AriaAttributes>(aria: SelectedAriaAttributes<T>): AriaAttributes => {
  if (typeof aria !== 'object' || aria === null) {
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
