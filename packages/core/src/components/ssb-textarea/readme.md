# ssb-textarea



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                      | Type                                                                                       | Default     |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------- |
| `aria`        | `aria`        | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.                | `string \| { 'aria-label': string; 'aria-describedby': string; 'aria-invalid': boolean; }` | `undefined` |
| `disabled`    | `disabled`    | Disables the textarea.                                                                                           | `boolean`                                                                                  | `false`     |
| `invalid`     | `invalid`     | Marks the textarea as invalid, sets `aria-invalid` and applies a destructive border.                             | `boolean`                                                                                  | `false`     |
| `name`        | `name`        | Name forwarded to the native textarea. Note: controls inside shadow DOM do not participate in surrounding forms. | `string`                                                                                   | `undefined` |
| `placeholder` | `placeholder` | Placeholder text shown while the textarea is empty.                                                              | `string`                                                                                   | `undefined` |
| `readonly`    | `readonly`    | Makes the textarea read-only.                                                                                    | `boolean`                                                                                  | `false`     |
| `required`    | `required`    | Marks the textarea as required.                                                                                  | `boolean`                                                                                  | `false`     |
| `rows`        | `rows`        | Number of visible text rows.                                                                                     | `number`                                                                                   | `3`         |
| `value`       | `value`       | Current value of the textarea.                                                                                   | `string`                                                                                   | `''`        |


## Events

| Event       | Description                                                                             | Type                              |
| ----------- | --------------------------------------------------------------------------------------- | --------------------------------- |
| `ssbChange` | Emitted when the value is committed (native change). Detail contains the current value. | `CustomEvent<{ value: string; }>` |
| `ssbInput`  | Emitted on every keystroke while the user types. Detail contains the current value.     | `CustomEvent<{ value: string; }>` |


----------------------------------------------


