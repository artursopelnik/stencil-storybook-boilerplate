# ssb-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                 | Type                                                                                       | Default     |
| ------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------- |
| `aria`        | `aria`        | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.           | `string \| { 'aria-label': string; 'aria-describedby': string; 'aria-invalid': boolean; }` | `undefined` |
| `disabled`    | `disabled`    | Disables the input.                                                                                         | `boolean`                                                                                  | `false`     |
| `invalid`     | `invalid`     | Marks the input as invalid, sets `aria-invalid` and applies a destructive border.                           | `boolean`                                                                                  | `false`     |
| `name`        | `name`        | Name forwarded to the native input. Note: inputs inside shadow DOM do not participate in surrounding forms. | `string`                                                                                   | `undefined` |
| `placeholder` | `placeholder` | Placeholder text shown while the input is empty.                                                            | `string`                                                                                   | `undefined` |
| `readonly`    | `readonly`    | Makes the input read-only.                                                                                  | `boolean`                                                                                  | `false`     |
| `required`    | `required`    | Marks the input as required.                                                                                | `boolean`                                                                                  | `false`     |
| `type`        | `type`        | Native input type of the control.                                                                           | `"email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "url"`                | `'text'`    |
| `value`       | `value`       | Current value of the input.                                                                                 | `string`                                                                                   | `''`        |


## Events

| Event       | Description                                                                             | Type                              |
| ----------- | --------------------------------------------------------------------------------------- | --------------------------------- |
| `ssbChange` | Emitted when the value is committed (native change). Detail contains the current value. | `CustomEvent<{ value: string; }>` |
| `ssbInput`  | Emitted on every keystroke while the user types. Detail contains the current value.     | `CustomEvent<{ value: string; }>` |


----------------------------------------------


