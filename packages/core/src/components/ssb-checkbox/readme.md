# ssb-checkbox



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                                                                                      | Type                                                              | Default     |
| --------------- | --------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------- |
| `aria`          | `aria`          | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.                | `string \| { 'aria-label': string; 'aria-describedby': string; }` | `undefined` |
| `checked`       | `checked`       | Whether the checkbox is checked.                                                                                 | `boolean`                                                         | `false`     |
| `disabled`      | `disabled`      | Disables the checkbox.                                                                                           | `boolean`                                                         | `false`     |
| `indeterminate` | `indeterminate` | Shows the indeterminate (mixed) state. Cleared as soon as the user toggles the checkbox.                         | `boolean`                                                         | `false`     |
| `label`         | `label`         | Text rendered next to the box. Alternatively use the default slot.                                               | `string`                                                          | `undefined` |
| `name`          | `name`          | Name forwarded to the native checkbox. Note: controls inside shadow DOM do not participate in surrounding forms. | `string`                                                          | `undefined` |
| `value`         | `value`         | Value forwarded to the native checkbox.                                                                          | `string`                                                          | `'on'`      |


## Events

| Event       | Description                                                                    | Type                                 |
| ----------- | ------------------------------------------------------------------------------ | ------------------------------------ |
| `ssbChange` | Emitted when the checked state changes. Detail contains the new checked state. | `CustomEvent<{ checked: boolean; }>` |


----------------------------------------------


