export type AriaAttributes = {
  // WAI-ARIA Attributes
  [key: `aria-${string}`]: string | boolean | undefined;
  [key: `aria${string}`]: string | boolean | undefined;
  role?: string;
};

// Workaround to accepts a json or just json string
export type SelectedAriaAttributes<T> = T | string;
