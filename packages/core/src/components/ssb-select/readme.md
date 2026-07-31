# ssb-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                    | Type                                                             | Default              |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------- |
| `aria`        | `aria`        | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.              | `string \| { 'aria-label': string; 'aria-labelledby': string; }` | `undefined`          |
| `disabled`    | `disabled`    | Disables the select.                                                                                           | `boolean`                                                        | `false`              |
| `name`        | `name`        | Name of the control. Note: controls inside shadow DOM do not participate in surrounding forms.                 | `string`                                                         | `undefined`          |
| `open`        | `open`        | Controls whether the listbox is shown.                                                                         | `boolean`                                                        | `false`              |
| `options`     | `options`     | Options to render (array of `{ label, value, disabled? }` objects or a JSON string when used as an attribute). | `SelectOption[] \| string`                                       | `[]`                 |
| `placeholder` | `placeholder` | Text shown in the trigger while no option is selected.                                                         | `string`                                                         | `'Select an option'` |
| `value`       | `value`       | Currently selected value.                                                                                      | `string`                                                         | `''`                 |


## Events

| Event           | Description                                                                  | Type                              |
| --------------- | ---------------------------------------------------------------------------- | --------------------------------- |
| `ssbChange`     | Emitted when the selection changes. Detail contains the selected value.      | `CustomEvent<{ value: string; }>` |
| `ssbOpenChange` | Emitted whenever the open state changes. Detail contains the new open state. | `CustomEvent<{ open: boolean; }>` |


----------------------------------------------


