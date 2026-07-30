# ssb-switch



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                      | Type                                                              | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------- |
| `aria`     | `aria`     | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.                | `string \| { 'aria-label': string; 'aria-describedby': string; }` | `undefined` |
| `checked`  | `checked`  | Whether the switch is on.                                                                                        | `boolean`                                                         | `false`     |
| `disabled` | `disabled` | Disables the switch.                                                                                             | `boolean`                                                         | `false`     |
| `name`     | `name`     | Name forwarded to the native checkbox. Note: controls inside shadow DOM do not participate in surrounding forms. | `string`                                                          | `undefined` |


## Events

| Event       | Description                                                                | Type                                 |
| ----------- | -------------------------------------------------------------------------- | ------------------------------------ |
| `ssbChange` | Emitted when the switch is toggled. Detail contains the new checked state. | `CustomEvent<{ checked: boolean; }>` |


----------------------------------------------


