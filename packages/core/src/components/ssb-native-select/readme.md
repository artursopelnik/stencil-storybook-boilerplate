# ssb-native-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                    | Type                                                              | Default     |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------- |
| `aria`        | `aria`        | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.              | `string \| { 'aria-label': string; 'aria-describedby': string; }` | `undefined` |
| `disabled`    | `disabled`    | Disables the select.                                                                                           | `boolean`                                                         | `false`     |
| `name`        | `name`        | Name forwarded to the native select. Note: controls inside shadow DOM do not participate in surrounding forms. | `string`                                                          | `undefined` |
| `options`     | `options`     | Options to render (array of `{ label, value, disabled? }` objects or a JSON string when used as an attribute). | `NativeSelectOption[] \| string`                                  | `[]`        |
| `placeholder` | `placeholder` | Renders a disabled empty first option as placeholder text.                                                     | `string`                                                          | `undefined` |
| `required`    | `required`    | Marks the select as required.                                                                                  | `boolean`                                                         | `false`     |
| `size`        | `size`        | Size of the select.                                                                                            | `"md" \| "sm"`                                                    | `'md'`      |
| `value`       | `value`       | Currently selected value.                                                                                      | `string`                                                          | `''`        |


## Events

| Event       | Description                                                             | Type                              |
| ----------- | ----------------------------------------------------------------------- | --------------------------------- |
| `ssbChange` | Emitted when the selection changes. Detail contains the selected value. | `CustomEvent<{ value: string; }>` |


----------------------------------------------


