# ssb-avatar



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                       | Type                                                          | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------- |
| `alt`      | `alt`      | Alternative text for the avatar image.                                                            | `string`                                                      | `''`        |
| `aria`     | `aria`     | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; 'aria-hidden': boolean; }` | `undefined` |
| `initials` | `initials` | Initials shown as fallback when no image is available or the image fails to load.                 | `string`                                                      | `undefined` |
| `shape`    | `shape`    | Shape of the avatar.                                                                              | `"circle" \| "square"`                                        | `'circle'`  |
| `size`     | `size`     | Size of the avatar.                                                                               | `"lg" \| "md" \| "sm"`                                        | `'md'`      |
| `src`      | `src`      | Image source URL. When omitted or when loading fails, the initials fallback is shown.             | `string`                                                      | `undefined` |


----------------------------------------------


