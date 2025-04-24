export type AriaAttributes = {
  // WAI-ARIA Attributes
  [key: `aria-${string}`]: string | boolean | undefined;
  [key: `aria${string}`]: string | boolean | undefined;
  role?: string;
};

// Workaround to accepts a json string or just json
export type SelectedAriaAttributes<T extends AriaAttributeType> = T | string;
