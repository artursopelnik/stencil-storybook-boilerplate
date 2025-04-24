export interface AriaAttributes {
  // WAI-ARIA Attributes
  [key: `aria-${string}`]: string | boolean | undefined;
  [key: `aria${string}`]: string | boolean | undefined;
  role?: string;
}
