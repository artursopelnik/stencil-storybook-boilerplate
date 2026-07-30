# ssb-radio-group



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                       | Type                                                             | Default      |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------ |
| `aria`        | `aria`        | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; 'aria-labelledby': string; }` | `undefined`  |
| `disabled`    | `disabled`    | Disables the whole group.                                                                         | `boolean`                                                        | `false`      |
| `name`        | `name`        | Informational name of the group, e.g. for form integrations.                                      | `string`                                                         | `''`         |
| `orientation` | `orientation` | Layout direction of the radios inside the group.                                                  | `"horizontal" \| "vertical"`                                     | `'vertical'` |
| `value`       | `value`       | Value of the currently selected `ssb-radio` child.                                                | `string`                                                         | `''`         |


## Events

| Event       | Description                              | Type                              |
| ----------- | ---------------------------------------- | --------------------------------- |
| `ssbChange` | Emitted when the selected value changes. | `CustomEvent<{ value: string; }>` |


----------------------------------------------


