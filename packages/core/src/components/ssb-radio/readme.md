# ssb-radio



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute  | Description                                                                                       | Type                                                              | Default     |
| -------------------- | ---------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------- |
| `aria`               | `aria`     | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; 'aria-describedby': string; }` | `undefined` |
| `checked`            | `checked`  | Whether the radio is selected. Managed by `ssb-radio-group` when used inside one.                 | `boolean`                                                         | `false`     |
| `disabled`           | `disabled` | Disables the radio.                                                                               | `boolean`                                                         | `false`     |
| `value` _(required)_ | `value`    | Value represented by this radio. Reported to the surrounding `ssb-radio-group` on selection.      | `string`                                                          | `undefined` |


## Events

| Event            | Description                                                                                                  | Type                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `ssbRadioSelect` | Emitted when the radio is selected. Bubbles so a surrounding `ssb-radio-group` can coordinate the selection. | `CustomEvent<{ value: string; }>` |


----------------------------------------------


