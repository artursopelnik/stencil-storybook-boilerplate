# ssb-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                       | Type                                                                                                               | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- |
| `aria`     | `aria`     | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; 'aria-expanded': boolean; 'aria-pressed': boolean; 'aria-haspopup': boolean; }` | `undefined` |
| `disabled` | `disabled` | Disables the button.                                                                              | `boolean`                                                                                                          | `false`     |
| `href`     | `href`     | When set, the button renders as an anchor element.                                                | `string`                                                                                                           | `undefined` |
| `size`     | `size`     | Size of the button. Use `icon` for square icon-only buttons.                                      | `"icon" \| "lg" \| "md" \| "sm"`                                                                                   | `'md'`      |
| `target`   | `target`   | Anchor target, only used together with `href`.                                                    | `string`                                                                                                           | `undefined` |
| `type`     | `type`     | Native button type. Note: buttons inside shadow DOM do not implicitly submit surrounding forms.   | `"button" \| "reset" \| "submit"`                                                                                  | `'button'`  |
| `variant`  | `variant`  | Visual style of the button.                                                                       | `"destructive" \| "ghost" \| "link" \| "outline" \| "primary" \| "secondary"`                                      | `'primary'` |


----------------------------------------------


