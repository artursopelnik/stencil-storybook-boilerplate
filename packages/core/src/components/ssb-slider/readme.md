# ssb-slider



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                       | Type                                                              | Default     |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------- |
| `aria`      | `aria`       | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; 'aria-describedby': string; }` | `undefined` |
| `disabled`  | `disabled`   | Disables the slider.                                                                              | `boolean`                                                         | `false`     |
| `max`       | `max`        | Maximum selectable value.                                                                         | `number`                                                          | `100`       |
| `min`       | `min`        | Minimum selectable value.                                                                         | `number`                                                          | `0`         |
| `showValue` | `show-value` | Renders the current value to the right of the track.                                              | `boolean`                                                         | `false`     |
| `step`      | `step`       | Granularity of the value.                                                                         | `number`                                                          | `1`         |
| `value`     | `value`      | Current value of the slider.                                                                      | `number`                                                          | `50`        |


## Events

| Event       | Description                                                   | Type                              |
| ----------- | ------------------------------------------------------------- | --------------------------------- |
| `ssbChange` | Emitted when the value is committed, e.g. when the drag ends. | `CustomEvent<{ value: number; }>` |
| `ssbInput`  | Emitted continuously while the thumb is dragged.              | `CustomEvent<{ value: number; }>` |


----------------------------------------------


